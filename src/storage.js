import chroma from 'chroma-js';
import seedColors from './seedColors';

export function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function loadPalettes() {
  try {
    const palettes = JSON.parse(readStorage('palettes'));
    const ids = new Set();
    if (
      !Array.isArray(palettes) ||
      !palettes.every((palette) => {
        if (
          !palette ||
          typeof palette.id !== 'string' ||
          !palette.id ||
          ids.has(palette.id)
        )
          return false;
        ids.add(palette.id);
        return (
          typeof palette.paletteName === 'string' &&
          typeof palette.emoji === 'string' &&
          Array.isArray(palette.colors) &&
          palette.colors.every(
            (color) =>
              color &&
              typeof color.name === 'string' &&
              typeof color.color === 'string' &&
              chroma.valid(color.color)
          )
        );
      })
    )
      return seedColors;
    return palettes;
  } catch {
    return seedColors;
  }
}

export function loadThemeMode() {
  const mode = readStorage('themeMode');
  return ['light', 'dark', 'system'].includes(mode) ? mode : 'system';
}
