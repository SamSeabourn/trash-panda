import { defineManifest } from '@crxjs/vite-plugin';

import pkg from './package.json';

export default defineManifest({
  name: pkg.name,
  manifest_version: 3,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  host_permissions: ['https://www.buymeacoffee.com/'],
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
        'trash-background.png',
        'codicon.ttf',
        'trashbar.png',
        'cooper.png',
        'trash-logo.svg',
      ],
    },
  ],
});
