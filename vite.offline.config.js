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
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
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
