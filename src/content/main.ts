import { isJSURL } from './helpers/is-js-url';
import { clearPage } from './helpers/clear-page';
import { spawnLoader } from './helpers/spawn-loader';
import { spawnEditor } from './helpers/spawn-editor';
import { injectStyles } from './helpers/inject-styles';
import { isJSSourceURL } from './helpers/is-js-source-url';
import { fetchRawSource } from './helpers/fetch-raw-source';
import { patchMonacoUrls } from './helpers/patch-monaco-urls';
import { splitUrlAndLineNumber } from './helpers/split-url-and-line-number';

const url = window.location.href;
if (isJSSourceURL(url) || isJSURL(url)) {
  let sourceURL = url;
  const lineColData = {
    line: 1,
    column: 1,
  };
  if (isJSSourceURL(url)) {
    const splitUrl = splitUrlAndLineNumber(url);
    sourceURL = splitUrl.baseUrl;
    if (splitUrl.line && splitUrl.column) {
      lineColData.line = splitUrl.line;
      lineColData.column = splitUrl.column;
    }
  }

  const sourceCode = await fetchRawSource(sourceURL);
  const enableCursor = !!lineColData.line && !!lineColData.column;
  const fileType = 'js';

  if (sourceCode) {
    clearPage();
    injectStyles();

    spawnLoader();
    patchMonacoUrls();
    spawnEditor({
      fileType,
      sourceCode,
      enableCursor,
      initialLineNumber: lineColData.line,
      initialColNumber: lineColData.column,
    });
  }
}
