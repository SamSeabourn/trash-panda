export const setupBackgroundListeners = () => {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'GET_COLOUR' && sender.tab?.id) {
      chrome.scripting.executeScript({
        files: ['content.js'],
        target: { tabId: sender.tab.id },
      });
    }
  });
};
