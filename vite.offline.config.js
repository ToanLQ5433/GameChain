// One-off config for producing a single, fully self-contained HTML file
// that opens directly via file:// (no dev server, no npm install on the
// recipient's machine). Not used by `npm run dev`/`npm run build`/Vercel —
// those still use vite.config.js untouched.
//
// Why not just `vite build --base ./`: the default ES-module output
// (<script type="module" crossorigin src="./assets/...">) still fails when
// opened via file:// in Chrome — module scripts are subject to CORS even
// for local files, and file:// is treated as an opaque "null" origin.
// Building as a classic IIFE script (no `type="module"`) sidesteps that
// entirely, and inlining the JS/CSS via vite-plugin-singlefile means the
// browser makes zero extra file:// requests after loading index.html.
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Redirect the game's level data import to the 18-level demo set
// (src/data/levels.demo.js, converted from Levels/*.json) for this build
// only — GameScene.js/progression.js keep importing '../data/levels.js'
// unmodified, so `npm run dev`/`npm run build` still ship the full 42-level
// game; only build:offline swaps in the demo-only category via this alias.
export default defineConfig({
  base: './',
  resolve: {
    // Vite/Rollup alias matches the import specifier TEXT as written in
    // source (both GameScene.js and progression.js import the exact
    // relative string '../data/levels.js'), not the resolved absolute
    // path — an absolute-path key here silently never matches.
    alias: [
      {
        find: '../data/levels.js',
        replacement: fileURLToPath(new URL('./src/data/levels.demo.js', import.meta.url))
      }
    ]
  },
  plugins: [viteSingleFile()],
  build: {
    outDir: 'dist-offline',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true
      }
    }
  }
});
