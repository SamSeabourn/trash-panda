import path from 'node:path';
import { defineConfig } from 'vite';
import zip from 'vite-plugin-zip-pack';
import { crx } from '@crxjs/vite-plugin';
import monacoEditorPlugin from 'vite-plugin-monaco-editor-esm';

import manifest from './manifest.config.js';
import { name, version } from './package.json';

export default defineConfig({
  build: {
    minify: true,
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    monacoEditorPlugin({
      languageWorkers: undefined,
      publicPath: 'assets/monaco-workers',
    }),
    crx({ manifest }),
    zip({ outDir: 'release', outFileName: `crx-${name}-${version}.zip` }),
  ],
});
