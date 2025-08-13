import fs from 'fs';
import path from 'path';

const monacoCSSPath = 'assets/monaco-editor.css';
const monacoEditorWorkerPath = 'assets/monaco-workers/editor.worker.bundle.js';
const monacoHTMLWorkerPath = 'assets/monaco-workers/html.worker.bundle.js';
const monacoTSWorkerPath = 'assets/monaco-workers/ts.worker.bundle.js';

// NOTE: Monaco requires a bunch of assets, since the Vite CRX extension doesnt know what the editor CSS will be we need to manually add to the manifest.
// TLDR.. required for lazy loading the editor
export const postBundle = () => {
  const distDir = path.resolve('./dist');
  const manifestPath = path.join(distDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.web_accessible_resources ??= [];

  // const alreadyAdded = manifest.web_accessible_resources.some((entry) =>
  //   entry.resources.includes(monacoCSSPath),
  // );

  // if (!alreadyAdded) {
  manifest.web_accessible_resources.push({
    matches: ['<all_urls>'],
    resources: [monacoCSSPath, monacoEditorWorkerPath, monacoHTMLWorkerPath, monacoTSWorkerPath],
  });
  // }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`adding: ${monacoCSSPath} to web_accessible_resources via postBundle.js`);
};

postBundle();
