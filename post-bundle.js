import fs from 'fs';
import path from 'path';

const MONACO_CSS_PATH = 'assets/monaco-editor.css';
const MONACO_EDITOR_WORKER_PATH = 'assets/monaco-workers/editor.worker.bundle.js';
const MONACO_HTML_WORKER_PATH = 'assets/monaco-workers/html.worker.bundle.js';
const MONACO_TS_WORKER_PATH = 'assets/monaco-workers/ts.worker.bundle.js';

// NOTE: Monaco requires a bunch of assets, since the Vite CRX extension doesnt know what the editor CSS will be we need to manually add to the manifest.
// TLDR.. required for lazy loading the editor
export const postBundle = () => {
  const distDir = path.resolve('./dist');
  const manifestPath = path.join(distDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.web_accessible_resources ??= [];
  manifest.web_accessible_resources.push({
    matches: ['<all_urls>'],
    resources: [
      MONACO_CSS_PATH,
      MONACO_EDITOR_WORKER_PATH,
      MONACO_HTML_WORKER_PATH,
      MONACO_TS_WORKER_PATH,
    ],
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`adding: ${MONACO_CSS_PATH} to web_accessible_resources via postBundle.js`);
};

postBundle();
