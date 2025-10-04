import { defineManifest } from '@crxjs/vite-plugin';

import pkg from './package.json';

export default defineManifest({
  manifest_version: 3,
  version: pkg.version,
  short_name: 'Trash Panda',
  permissions: ['scripting'],
  icons: {
    48: 'public/logo.png',
  },
  name: 'Trash Panda - Minified JS Line Finder',
  background: {
    service_worker: 'src/background/main.ts',
  },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: {
      48: 'public/logo.png',
    },
  },
  content_scripts: [
    {
      matches: ['https://*/*'],
      run_at: 'document_start',
      js: ['src/content/main.ts'],
    },
  ],
  description:
    'Format and find error locations in minified JavaScript. Trash Panda pinpoints the exact line and column for faster debugging.',
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: [
        'codicon.ttf',
        'trashbar.png',
        'cooper-coffee.svg',
        'cooper-munching.svg',
        'trash-logo.svg',
        'assets/monaco-editor.css',
        'buymeacoffeelogo.svg',
      ],
    },
  ],
});
