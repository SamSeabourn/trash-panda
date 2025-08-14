import path from 'node:path';
import { defineConfig } from 'vite';
import zip from 'vite-plugin-zip-pack';
import { crx } from '@crxjs/vite-plugin';
import { monaco } from '@bithero/monaco-editor-vite-plugin';
import monacoEditorEsmPlugin from 'vite-plugin-monaco-editor-esm';

import manifest from './manifest.config.js';
import { name, version } from './package.json';

export default defineConfig({
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
    monacoEditorEsmPlugin({
      publicPath: 'assets/monaco-workers',
      languageWorkers: ['editorWorkerService', 'typescript', 'html'],
    }),
    monaco({
      features: 'all',
      globalAPI: true,
      languages: ['javascript', 'html'],
    }),
    crx({ manifest }),
    zip({ outDir: 'release', outFileName: `${name}-${version}.zip` }),
  ],
  build: {
    minify: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.startsWith('editor') && assetInfo.name?.endsWith('css')) {
            return 'assets/monaco-editor.css'; //Dont hash so we can manually add it to the manifest later (required for lazy loading)
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
