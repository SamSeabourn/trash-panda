import { isJSURL } from './helpers/is-js-url';
import { colours } from '../constants/colours';
import { clearPage } from './helpers/clear-page';
import { spawnLoader } from './helpers/spawn-loader';
import { spawnEditor } from './helpers/spawn-editor';
import { injectStyles } from './helpers/inject-styles';
import { isJSSourceURL } from './helpers/is-js-source-url';
import { fetchRawSource } from './helpers/fetch-raw-source';
import { patchMonacoUrls } from './helpers/patch-monaco-urls';
import { setupContentListners } from './helpers/setup-content-listeners';
import { DEFAULT_RACOON_COLOUR } from '../constants/default-racoon-colour';
import { getSeededRandomNumber } from './helpers/get-seeded-random-number';
import { splitUrlAndLineNumber } from './helpers/split-url-and-line-number';

let loadingScreenColour = DEFAULT_RACOON_COLOUR;

window.__trash_panda = {
  currentRacoonColor: loadingScreenColour,
};

setupContentListners();

const url = window.location.href;
if (isJSSourceURL(url) || isJSURL(url)) {
  let sourceURL = url;
  const lineColData: {
    line: number | null;
    column: number | null;
  } = {
    line: null,
    column: null,
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

  if (!!lineColData.line && !!lineColData.column) {
    const loaderColorIndex = getSeededRandomNumber(
      lineColData.line + lineColData.column,
      colours.length - 1,
    );
    loadingScreenColour = colours[loaderColorIndex].rgb;
  }

  window.__trash_panda.currentRacoonColor = loadingScreenColour;

  if (sourceCode) {
    clearPage();
    injectStyles();
    spawnLoader(loadingScreenColour);
    patchMonacoUrls();
    spawnEditor({
      fileType,
      sourceCode,
      enableCursor,
      initialLineNumber: lineColData.line || 1,
      initialColNumber: lineColData.column || 1,
    });
  }
}
