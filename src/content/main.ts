import { isJSURL } from './helpers/is-js-url';
import { spawnEditor } from './helpers/spawn-editor';
import { spawnDialog } from './helpers/spawn-dialog';
import { addHashbang } from './helpers/add-hashbang';
import { injectStyles } from './helpers/inject-styles';
import { isJSSourceURL } from './helpers/is-js-source-url';
import { patchMonacoUrls } from './helpers/patch-monaco-urls';
import { extractErrorMessage } from './helpers/extract-error-message';
import { splitUrlAndLineNumber } from './helpers/split-url-and-line-number';
import { hasValidHashPrameters } from './helpers/has-valid-hashbang-params';

if (isJSSourceURL(window.location.href)) {
  const { line, column, baseUrl } = splitUrlAndLineNumber(window.location.href);
  if (line && baseUrl && column) {
    window.location.href = addHashbang(baseUrl, line, column);
  }
}

try {
  if (hasValidHashPrameters(window.location.href)) {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(2));
    const line = Number(params.get('line'));
    const column = Number(params.get('col'));
    const newUrl = `${window.location.pathname}:${line}:${column}`;
    history.replaceState(null, '', newUrl); //Just set url in the URL bar to make it look cool
    patchMonacoUrls();
    injectStyles();
    spawnEditor(line, column);
  } else if (isJSURL(window.location.href)) {
    patchMonacoUrls();
    injectStyles();
    spawnEditor(1, 1, false);
  }
} catch (ex) {
  const errorMessage = extractErrorMessage(ex);
  spawnDialog({
    type: 'error',
    message: errorMessage,
    title: 'Yikers, something went wrong',
  });
}
