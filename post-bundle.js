import fs from 'fs';
import path from 'path';


// NOTE: Monaco requires a bunch of assets, since the Vite CRX extension doesnt know what the editor CSS will be we need to manually add to the manifest.
// TLDR.. required for lazy loading the editor
export const postBundle = () => {
  const distDir = path.resolve('./dist');
  const manifestPath = path.join(distDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.web_accessible_resources ??= [];
  const monacoCSS = 'assets/monaco-editor.css';
  const alreadyAdded = manifest.web_accessible_resources.some((entry) =>
    entry.resources.includes(monacoCSS),
  );

  if (!alreadyAdded) {
    manifest.web_accessible_resources.push({
      resources: [monacoCSS],
      matches: ['<all_urls>'],
    });
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`adding: ${monacoCSS} to web_accessible_resources via postBundle.js`);
};

postBundle()
