import { applySVGColourScheme } from './apply-svg-colour-scheme';
import { JSDeveloperThoughts } from '../../constants/js-developer-thoughts';

export const spawnLoader = async (characterColor: string) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'splash-page';

  const response = await fetch(chrome.runtime.getURL('cooper-munching.svg'));
  const svgString = await response.text();
  const colourShiftString = applySVGColourScheme(svgString, characterColor);

  const encodedSvg = encodeURIComponent(colourShiftString);

  wrapper.innerHTML = `
    <img class="splash-logo" src="${chrome.runtime.getURL('trash-logo.svg')}">
    <h2 class="splash-loading-text">Loading</h2>
    <br><br><br><br>
    <div class="bubble">
      ${JSDeveloperThoughts.sort(() => Math.random() - 0.5)[0]}
    </div>
    <img class="cooper" src="${`data:image/svg+xml,${encodedSvg}`}">
    <br>
  `;

  document.body.appendChild(wrapper);
};
