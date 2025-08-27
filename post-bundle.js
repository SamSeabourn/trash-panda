import fs from 'fs';
import path from 'path';

const MONACO_CSS_PATH = 'assets/monaco-editor.css';

// NOTE: Monaco requires a bunch of assets, since the Vite CRX extension doesnt know what the editor CSS will be we need to manually add to the manifest.
// TLDR.. required for lazy loading the editor
export const postBundle = () => {
  const distDir = path.resolve('./dist');
  const manifestPath = path.join(distDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.web_accessible_resources ??= [];
  manifest.web_accessible_resources.push({
    matches: ['<all_urls>'],
    resources: [MONACO_CSS_PATH],
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`adding: ${MONACO_CSS_PATH} to web_accessible_resources via postBundle.js`);
};

postBundle();
