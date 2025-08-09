import { isJSURL } from './helpers/is-js-url';
import { spawnEditor } from './helpers/spawn-editor';
import { injectStyles } from './helpers/inject-styles';
import { isJSSourceURL } from './helpers/is-js-source-url';
import { addSearchParams } from './helpers/add-search-params';
import { splitUrlAndLineNumber } from './helpers/split-url-and-line-number';
import { hasValidLinenumberParams } from './helpers/has-valid-linenumber-params';

console.log('Loading start');

if (isJSSourceURL(window.location.href)) {
  const { line, column, baseUrl } = splitUrlAndLineNumber(window.location.href);
  if (line && baseUrl && column) {
    window.location.href = addSearchParams(baseUrl, line, column);
  }
}

if (hasValidLinenumberParams(window.location.href)) {
  const parsed = new URL(window.location.href);
  const line = Number(parsed.searchParams.get('line'));
  const column = Number(parsed.searchParams.get('column'));
  injectStyles();
  spawnEditor(line, column);
}

if (isJSURL(window.location.href)) {
  injectStyles();
  spawnEditor(1, 1, false);
}
