import { JSDeveloperThoughts } from '../constants/js-developer-thoughts';

export const spawnLoader = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'splash-page';

  wrapper.innerHTML = `
    <img class="splash-logo" src="${chrome.runtime.getURL('trash-logo.svg')}">
    <h2 class="splash-loading-text">Loading</h2>
    <br><br><br><br>
    <div class="bubble">
      ${JSDeveloperThoughts.sort(() => Math.random() - 0.5)[0]}
    </div>
    <img class="cooper" src="${chrome.runtime.getURL('cooper.png')}">
    <br>
  `;

  document.body.appendChild(wrapper);
};
