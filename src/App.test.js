import React from 'react';
import {
  render as renderWithTestingLibrary,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import AppProviders from './AppProviders';
import seedColors from './seedColors';
import NewPaletteForm from './components/NewPaletteForm';
import ColorBox from './components/ColorBox';
import SingleColorPalette from './components/SingleColorPalette';
import { generatePalette } from './colorHelpers';
import { fillPalette } from './paletteHelpers';
import { loadPalettes, loadThemeMode, writeStorage } from './storage';

// The real custom-element emoji picker is exercised by the browser suite.
// Keep these DOM tests focused on the save dialog and persistence wiring.
vi.mock('./components/EmojiPicker', () => ({
  default: ({ onSelect }) => <button onClick={() => onSelect({ native: '😀' })}>😀, grinning</button>
}));

const render = (ui) => renderWithTestingLibrary(ui, { wrapper: AppProviders });
const openApp = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
beforeEach(() => window.localStorage.clear());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('palette library', () => {
  it('opens a palette with the keyboard', async () => {
    openApp();
    screen
      .getByRole('link', { name: `Open ${seedColors[0].paletteName}` })
      .focus();
    await userEvent.keyboard('{Enter}');
    expect(
      await screen.findByRole('button', { name: /Copy red 500/i })
    ).toBeTruthy();
  });
  it('navigates to the palette editor from both create links', async () => {
    openApp();
    await userEvent.click(
      screen.getByRole('link', { name: 'Create Palette', exact: true })
    );
    expect(await screen.findByRole('button', { name: 'Clear Palette' })).toBeTruthy();

    cleanup();
    localStorage.setItem('palettes', '[]');
    openApp();
    await userEvent.click(
      screen.getByRole('link', { name: 'Create your first palette', exact: true })
    );
    expect(await screen.findByRole('button', { name: 'Clear Palette' })).toBeTruthy();
  });
  it('persists deletion, reloads it, and resets to defaults', async () => {
    const app = openApp();
    const name = seedColors[0].paletteName;
    fireEvent.click(screen.getByRole('button', { name: `Delete ${name}` }));
    fireEvent.click(
      screen.getByText('Delete', { selector: 'span.MuiListItemText-primary' })
    );
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem('palettes'))).toHaveLength(
        seedColors.length - 1
      )
    );
    app.unmount();
    openApp();
    expect(screen.queryByRole('link', { name: `Open ${name}` })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    fireEvent.click(
      screen.getByText('Reset', { selector: 'span.MuiListItemText-primary' })
    );
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem('palettes'))).toEqual(seedColors)
    );
    expect(
      await screen.findByRole('link', { name: `Open ${name}` })
    ).toBeTruthy();
  });
  it.each([
    '/palette/missing',
    '/palette/missing/red',
    '/palette/material-ui-colors/missing'
  ])('recovers from route %s', (path) => {
    openApp(path);
    expect(
      screen.getByRole('heading', { name: 'React Palettes' })
    ).toBeTruthy();
  });
  it('creates, saves, and reloads a palette', async () => {
    const app = openApp('/palette/new');
    fireEvent.click(await screen.findByRole('button', { name: 'Save' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Palette Name' }), {
      target: { value: 'Test Palette' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Palette Name' }));
    const emoji = (
      await screen.findAllByRole('button', { name: '😀, grinning' })
    )[0];
    fireEvent.click(emoji);
    expect(
      await screen.findByRole('link', { name: 'Open Test Palette' })
    ).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('palettes')).at(-1).id).toBe(
      'test-palette'
    );
    app.unmount();
    openApp();
    expect(
      screen.getByRole('link', { name: 'Open Test Palette' })
    ).toBeTruthy();
  });
});

describe('palette editor', () => {
  const openEditor = () =>
    render(
      <MemoryRouter>
        <NewPaletteForm
          palettes={seedColors}
          savePalette={vi.fn()}
          history={{ push: vi.fn() }}
        />
      </MemoryRouter>
    );
  it('fills an empty palette and disables generation at capacity', () => {
    openEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Clear Palette' }));
    expect(screen.queryAllByRole('button', { name: /^Remove / })).toHaveLength(
      0
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate Full' }));
    expect(screen.getAllByRole('button', { name: /^Remove / })).toHaveLength(
      20
    );
    expect(screen.getByRole('button', { name: 'Generate Full' }).disabled).toBe(
      true
    );
  });
  it('rejects duplicate color and palette names', async () => {
    openEditor();
    fireEvent.change(screen.getByRole('textbox', { name: 'Color Name' }), {
      target: { value: 'red' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Color' }));
    expect(
      await screen.findByText('Color name is already in use')
    ).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Palette Name' }), {
      target: { value: seedColors[0].paletteName.toUpperCase() }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Palette Name' }));
    expect(await screen.findByText('Name already used')).toBeTruthy();
  });
  it('terminates with an exhausted pool and preserves its input', () => {
    const colors = [{ name: 'Red', color: '#f00' }];
    expect(fillPalette(colors, 20, colors)).toEqual(colors);
    expect(fillPalette([], 20, [...colors, ...colors])).toEqual(colors);
    expect(colors).toHaveLength(1);
  });
});

describe('storage recovery', () => {
  it('persists and restores the selected theme', () => {
    const app = openApp();
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Choose color theme' }),
      { target: { value: 'dark' } }
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('themeMode')).toBe('dark');
    app.unmount();
    openApp();
    expect(
      screen.getByRole('combobox', { name: 'Choose color theme' }).value
    ).toBe('dark');
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Choose color theme' }),
      { target: { value: 'light' } }
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
  it('rejects saved palettes with invalid colors or duplicate IDs', () => {
    const palette = {
      ...seedColors[0],
      colors: [{ name: 'broken', color: 'invalid' }]
    };
    localStorage.setItem('palettes', JSON.stringify([palette]));
    expect(loadPalettes()).toEqual(seedColors);
    localStorage.setItem(
      'palettes',
      JSON.stringify([seedColors[0], seedColors[0]])
    );
    expect(loadPalettes()).toEqual(seedColors);
  });
  it.each(['{broken', '{}', '[null]', '[{"id":"x"}]'])(
    'recovers invalid data %s',
    (value) => {
      localStorage.setItem('palettes', value);
      expect(loadPalettes()).toEqual(seedColors);
      openApp();
      expect(
        screen.getByRole('heading', { name: 'React Palettes' })
      ).toBeTruthy();
    }
  );
  it('preserves an intentionally empty library', () => {
    localStorage.setItem('palettes', '[]');
    expect(loadPalettes()).toEqual([]);
  });
  it('handles blocked storage, quota failures, and invalid themes', () => {
    localStorage.setItem('themeMode', 'invalid');
    expect(loadThemeMode()).toBe('system');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota');
    });
    expect(loadPalettes()).toEqual(seedColors);
    expect(writeStorage('palettes', '[]')).toBe(false);
    expect(() => openApp()).not.toThrow();
  });
  it('explains failed saves while preserving the current session', async () => {
    openApp();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    fireEvent.click(
      screen.getByText('Reset', { selector: 'span.MuiListItemText-primary' })
    );
    expect(
      await screen.findByText(/Changes could not be saved to browser storage/)
    ).toBeTruthy();
    expect(
      await screen.findByRole('link', {
        name: `Open ${seedColors[0].paletteName}`
      })
    ).toBeTruthy();
  });
});

describe('clipboard and shades', () => {
  it('copies the selected value and clears its feedback timer on unmount', () => {
    vi.useFakeTimers();
    const copy = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: copy
    });
    const view = render(
      <MemoryRouter>
        <ColorBox name='Red' background='#ff0000' />
      </MemoryRouter>
    );
    const timeout = vi.spyOn(globalThis, 'setTimeout');
    const clear = vi.spyOn(globalThis, 'clearTimeout');
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy Red as #ff0000' })
    );
    const feedbackTimer =
      timeout.mock.results[
        timeout.mock.calls.findIndex((args) => args[1] === 1500)
      ].value;
    expect(copy).toHaveBeenCalledWith('copy');
    expect(screen.getByRole('status').textContent).toContain('#ff0000');
    view.unmount();
    expect(clear).toHaveBeenCalledWith(feedbackTimer);
  });
  it('does not report failed copying as success', () => {
    vi.spyOn(window, 'prompt').mockReturnValue(null);
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: () => false
    });
    render(
      <MemoryRouter>
        <ColorBox name='Red' background='#ff0000' />
      </MemoryRouter>
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy Red as #ff0000' })
    );
    expect(screen.queryByRole('status')).toBeNull();
  });
  it('updates shades when the selected color changes', () => {
    const palette = generatePalette(seedColors[0]);
    const view = render(
      <MemoryRouter>
        <SingleColorPalette palette={palette} colorId='red' />
      </MemoryRouter>
    );
    view.rerender(
      <MemoryRouter>
        <SingleColorPalette palette={palette} colorId='blue' />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Copy blue 500/i })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Copy red 500/i })).toBeNull();
  });
});
