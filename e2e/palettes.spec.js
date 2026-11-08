import { test, expect } from '@playwright/test';

const noHorizontalOverflow = async page => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
};

test('mobile studio, swatches, theme and save flow remain usable', async ({ page }, testInfo) => {
  const errors = [];
  const scripts = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.resourceType() === 'script') scripts.push(request.url()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'React Palettes' })).toBeVisible();
  await noHorizontalOverflow(page);
  await page.getByRole('combobox', { name: 'Choose color theme' }).selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('link', { name: 'Create Palette', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Clear Palette' })).toBeVisible();
  expect(scripts.some(url => /EmojiPicker|emoji-data/.test(url))).toBe(false);
  const input = page.getByRole('textbox', { name: 'Color Name' });
  await input.fill('Draft color');
  await page.getByRole('button', { name: 'Clear Palette' }).click();
  await page.getByRole('button', { name: 'Generate Full' }).click();
  // The modal drawer hides the palette from assistive technology until closed.
  await page.getByRole('button', { name: 'Close drawer and view palette' }).click();
  await expect(page.getByRole('list', { name: 'Palette colors' }).getByRole('listitem')).toHaveCount(20);
  await noHorizontalOverflow(page);
  const lastRemove = page.getByRole('button', { name: /^Remove / }).last();
  await lastRemove.scrollIntoViewIfNeeded();
  await expect(lastRemove).toBeInViewport();
  const target = await lastRemove.boundingBox();
  expect(target.width).toBeGreaterThanOrEqual(44);
  expect(target.height).toBeGreaterThanOrEqual(44);
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expect(page.getByRole('textbox', { name: 'Color Name' })).toHaveValue('Draft color');
  await page.getByRole('button', { name: 'Close drawer and view palette' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('textbox', { name: 'Palette Name' }).fill('Browser palette');
  await page.getByRole('button', { name: 'Save Palette Name' }).click();
  await expect(page.locator('em-emoji-picker').getByRole('button', { name: '😀', exact: true }).first()).toBeVisible();
  expect(scripts.some(url => /EmojiPicker/.test(url))).toBe(true);
  await page.locator('em-emoji-picker').getByRole('button', { name: '😀', exact: true }).first().click();
  await expect(page.getByRole('link', { name: 'Open Browser palette' })).toBeVisible();
  await page.reload();
  await page.getByRole('link', { name: 'Open Browser palette' }).click();
  const copy = page.getByRole('button', { name: /^Copy / }).first();
  await expect(copy).toBeVisible();
  await noHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('palette-dark.png'), fullPage: true });
  await page.getByRole('combobox', { name: 'Choose color theme' }).selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.screenshot({ path: testInfo.outputPath('palette-light.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('keyboard reordering supports drop and cancel', async ({ page }) => {
  await page.goto('/palette/new');
  await page.getByRole('button', { name: 'Close drawer and view palette' }).click();
  const items = page.getByRole('list', { name: 'Palette colors' }).getByRole('listitem');
  await expect(items).toHaveCount(20);
  const before = await items.evaluateAll(nodes => nodes.map(node => node.dataset.colorName));
  const handle = page.getByRole('button', { name: `Reorder ${before[0]}`, exact: true });
  await handle.click({ trial: true });
  await handle.focus();
  await handle.press('Space');
  await handle.press(page.viewportSize().width <= 576 ? 'ArrowDown' : 'ArrowRight');
  await handle.press('Space');
  await expect.poll(() => items.evaluateAll(nodes => nodes.map(node => node.dataset.colorName))).toEqual([before[1], before[0], ...before.slice(2)]);
  await expect(handle).toBeFocused();
  await handle.press('Space');
  await handle.press('ArrowDown');
  await handle.press('Escape');
  expect(await items.evaluateAll(nodes => nodes.map(node => node.dataset.colorName))).toEqual([before[1], before[0], ...before.slice(2)]);
});

test('pointer reordering keeps deletion independent', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Pointer geometry is checked on desktop; touch layouts use the same handle and keyboard tests.');
  await page.goto('/palette/new');
  await page.getByRole('button', { name: 'Close drawer and view palette' }).click();
  const items = page.getByRole('list', { name: 'Palette colors' }).getByRole('listitem');
  await expect(items).toHaveCount(20);
  const before = await items.evaluateAll(nodes => nodes.map(node => node.dataset.colorName));
  const firstHandle = page.getByRole('button', { name: `Reorder ${before[0]}`, exact: true });
  await firstHandle.click({ trial: true });
  const first = await firstHandle.boundingBox();
  const second = await items.nth(1).boundingBox();
  await page.mouse.move(first.x + first.width / 2, first.y + first.height / 2);
  await page.mouse.down();
  await page.mouse.move(second.x + second.width / 2, second.y + second.height / 2, { steps: 20 });
  await page.mouse.up();
  await expect.poll(() => items.first().getAttribute('data-color-name')).toBe(before[1]);
  await page.getByRole('button', { name: `Remove ${before[0]}`, exact: true }).click();
  await expect(items).toHaveCount(19);
});
