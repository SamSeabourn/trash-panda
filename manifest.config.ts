import { defineManifest } from '@crxjs/vite-plugin';

import pkg from './package.json';

export default defineManifest({
  name: pkg.name,
  manifest_version: 3,
  version: pkg.version,
  permissions: ['tabs', 'scripting'],
  icons: {
    48: 'public/logo.png',
  },
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
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: [
        'codicon.ttf',
        'trashbar.png',
        'cooper-coffee.svg',
        'cooper-munching.svg',
        'trash-logo.svg',
      ],
    },
  ],
});
