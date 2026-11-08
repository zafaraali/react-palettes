// Node exposes its own localStorage in newer releases. Use a browser-style
// in-memory store so tests are isolated and do not depend on Node CLI flags.
class TestStorage {
  constructor() {
    this.values = new Map();
  }
  getItem(key) {
    return this.values.get(String(key)) ?? null;
  }
  setItem(key, value) {
    this.values.set(String(key), String(value));
  }
  removeItem(key) {
    this.values.delete(String(key));
  }
  clear() {
    this.values.clear();
  }
  key(index) {
    return [...this.values.keys()][index] ?? null;
  }
  get length() {
    return this.values.size;
  }
}

Object.defineProperty(window, 'Storage', {
  configurable: true,
  value: TestStorage
});
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: new TestStorage()
});

// react-color probes canvas support to draw its alpha checkerboard. The visual
// texture is irrelevant to DOM interaction tests; a minimal drawing surface
// avoids jsdom's unsupported-canvas noise without hiding console errors.
HTMLCanvasElement.prototype.getContext = function () {
  return { fillRect() {}, translate() {}, fillStyle: '' };
};
HTMLCanvasElement.prototype.toDataURL = function () {
  return 'data:image/png;base64,';
};
