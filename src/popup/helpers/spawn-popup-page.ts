import { isDarkMode } from './is-dark-mode';
import { THEME } from '../../constants/theme';
import { applySVGColourScheme } from './apply-svg-colour-scheme';

export const spawnPopupPage = async (characterColor: string) => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = '';
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'popup-page';
  wrapper.style.backgroundColor = isDarkMode() ? THEME.DARK.BACKGROUND : THEME.LIGHT.BACKGROUND;

  const response = await fetch(chrome.runtime.getURL('cooper-coffee.svg'));
  const svgString = await response.text();
  const colourShiftString = applySVGColourScheme(svgString, characterColor);

  const encodedSvg = encodeURIComponent(colourShiftString);

  wrapper.innerHTML = `
    <div class='popup-container'>
      <p style='color:${isDarkMode() ? THEME.DARK.TEXT : THEME.LIGHT.TEXT};font-size: 1rem;text-align: center;'>
        Thanks for using Trash Panda!
        Please go to Github to leave a star or request new features
      </p>
      <div>
        <button class='button'>Github</button>
      </div>  
    </div>
    <div>
      <img class="cooper" src="${`data:image/svg+xml,${encodedSvg}`}">
    </div>
  `;

  document.body.appendChild(wrapper);
};
