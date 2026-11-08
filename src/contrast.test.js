import { describe, expect, it } from 'vitest';
import chroma from 'chroma-js';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { readableText } from './contrast';

describe('swatch text contrast', () => {
  it.each([0, 0.3])('meets 4.5:1 across all generated shades with a %s white overlay', overlay => {
    for (const starter of seedColors) {
      const palette = generatePalette(starter);
      for (const shade of Object.values(palette.colors).flat()) {
        const surface = overlay ? chroma.mix(shade.hex, '#fff', overlay, 'rgb') : shade.hex;
        expect(chroma.contrast(surface, readableText(shade.hex, overlay))).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
  it('keeps custom midtones readable, including the former white-on-red case', () => {
    for (const color of ['#f44336', '#777777', '#808000', '#2196f3', '#fff', '#000']) {
      expect(chroma.contrast(color, readableText(color))).toBeGreaterThanOrEqual(4.5);
    }
  });
});
