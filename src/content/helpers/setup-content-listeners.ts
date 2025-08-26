import { DEFAULT_RACOON_COLOUR } from '../../constants/default-racoon-colour';

export const setupContentListners = () => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GET_COLOUR') {
      const colour = window?.__trash_panda?.currentRacoonColor || DEFAULT_RACOON_COLOUR;
      sendResponse({ color: colour });
      return true;
    }
  });
};
