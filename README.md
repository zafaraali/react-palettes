# react-palettes

A React color selection app that allows the user to copy colors from various palettes.

## Development

Use Node.js 20.19+ or 22.12+, then run `npm install` and `npm start`.
Run `npm test` to execute tests and `npm run build` to create a production build.

Run `npm run lint` and `npm run format:check` before committing. Use `npm run format`
to apply the shared formatting rules. For a reproducible install, use `npm ci`.

Palettes and the theme preference are saved in browser local storage. Invalid saved
data falls back to the starter palettes; an intentionally empty library stays empty.
If the browser blocks storage or runs out of space, edits remain available in the
current session and the app displays a save warning.

The palette editor is loaded on demand. Shared theme colors live in the CSS
variables in `src/index.css`; component styles reference those tokens directly.
The interaction tests cover saving/reloading, deletion/reset, keyboard navigation,
validation, generation, clipboard feedback, and storage/route recovery.
