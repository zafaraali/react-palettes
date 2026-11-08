import chroma from 'chroma-js';

// Match the translucent white surface used by Copy and More controls before
// choosing their text color. Black or white always achieves at least 4.5:1
// against an opaque sRGB background when the higher-contrast option is used.
export function readableText(background, whiteOverlay = 0) {
  const surface = whiteOverlay
    ? chroma.mix(background, '#fff', whiteOverlay, 'rgb')
    : chroma(background);
  return chroma.contrast(surface, '#000') >= chroma.contrast(surface, '#fff')
    ? '#000'
    : '#fff';
}
