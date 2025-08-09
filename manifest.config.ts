import { defineManifest } from '@crxjs/vite-plugin';

import pkg from './package.json';

export default defineManifest({
  name: pkg.name,
  manifest_version: 3,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: {
      48: 'public/logo.png',
    },
  },
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: ['trash-background.png', 'codicon.ttf'],
    },
  ],
  content_scripts: [
    {
      matches: ['https://*/*'],
      run_at: 'document_start',
      js: ['src/content/main.ts'],
    },
  ],
});
