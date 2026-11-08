import seedColors from './seedColors';

const seedPool = seedColors.flatMap((palette) => palette.colors);

// Sample without replacement so empty palettes and exhausted pools always finish.
export function fillPalette(colors, maxColors, pool = seedPool) {
  const names = new Set(colors.map((color) => color.name));
  const available = pool.filter((color) => {
    if (names.has(color.name)) return false;
    names.add(color.name);
    return true;
  });
  const result = [...colors];
  while (result.length < maxColors && available.length) {
    const index = Math.floor(Math.random() * available.length);
    result.push(available.splice(index, 1)[0]);
  }
  return result;
}
