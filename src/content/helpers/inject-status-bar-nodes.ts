export const injectStatusBar = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'status-wrapper';

  const image = document.createElement('img');
  image.id = 'cooper';
  image.src = chrome.runtime.getURL('cooper.png');
  image.alt = 'trash icon';

  const statusBarElement = document.createElement('footer');
  statusBarElement.className = 'status-bar';

  wrapper.appendChild(image);
  wrapper.appendChild(statusBarElement);

  document.body.appendChild(wrapper);
};
