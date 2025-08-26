import { spawnPopupPage } from './helpers/spawn-popup-page';
import { DEFAULT_RACOON_COLOUR } from '../constants/default-racoon-colour';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.id) {
      chrome.tabs.sendMessage(activeTab.id, { type: 'GET_COLOUR' }, (response) => {
        if (chrome.runtime.lastError) {
          spawnPopupPage(DEFAULT_RACOON_COLOUR);
          return;
        }

        if (response && response.color) {
          spawnPopupPage(response.color);
        }
      });
    }
  });
});
