export const attachBMCLogic = (options: any) => {
  const config = {
    message: null,
    x_margin: '18',
    y_margin: '18',
    color: '#FFDD00',
    id: 'samseabourn',
    position: 'Right',
    targetElement: document.body,
    description: 'Support me on Buy Me a Coffee!',
    ...options,
  };

  if (!config.id) {
    console.error("Buy Me a Coffee widget: 'id' is a required option.");
    return;
  }

  const iframeMaxHeight = window.innerHeight - 120;

  const widgetButton = document.createElement('div');
  widgetButton.id = 'bmc-wbtn';
  Object.assign(widgetButton.style, {
    width: '64px',
    height: '64px',
    color: 'white',
    zIndex: '9999',
    display: 'flex',
    position: 'fixed',
    cursor: 'pointer',
    fontWeight: '600',
    alignItems: 'center',
    borderRadius: '32px',
    justifyContent: 'center',
    background: config.color,
    transition: '.25s ease all',
    bottom: `${config.y_margin}px`,
    boxShadow: '0 4px 8px rgba(0,0,0,.15)',
  });
  widgetButton.style[config.position.toLowerCase() === 'left' ? 'left' : 'right'] =
    `${config.x_margin}px`;
  widgetButton.innerHTML =
    '<img src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg" alt="Buy Me A Coffee" style="height: 36px; width: 36px; margin: 0; padding: 0;">';

  const widgetOverlay = document.createElement('div');
  Object.assign(widgetOverlay.style, {
    top: '0',
    left: '0',
    width: '0',
    height: '0',
    position: 'fixed',
    zIndex: '9999999',
    background: 'rgba(0, 0, 0, 0)',
  });

  const widgetIframe = document.createElement('iframe');
  widgetIframe.id = 'bmc-iframe';
  widgetIframe.title = 'Buy Me a Coffee';
  widgetIframe.setAttribute('allow', 'publickey-credentials-get *; payment *');
  Object.assign(widgetIframe.style, {
    margin: '0',
    border: '0',
    height: '0',
    opacity: '0',
    width: '420px',
    zIndex: '999999',
    position: 'fixed',
    maxWidth: '420px',
    userSelect: 'none',
    borderRadius: '10px',
    transform: 'scale(0)',
    backgroundSize: '64px',
    transition: 'all .25s ease',
    transformOrigin: 'right bottom',
    minHeight: `${iframeMaxHeight}px`,
    maxHeight: `${iframeMaxHeight}px`,
    boxShadow: '-6px 0px 30px rgba(13, 12, 34, 0.1)',
    bottom: `${parseInt(config.y_margin, 10) + 72}px`,
    background:
      '#fff url(https://cdn.buymeacoffee.com/assets/img/widget/loader.svg) center no-repeat',
  });
  widgetIframe.style[config.position.toLowerCase() === 'left' ? 'left' : 'right'] =
    `${config.x_margin}px`;

  const messageBubble = document.createElement('div');
  Object.assign(messageBubble.style, {
    opacity: '0',
    width: 'auto',
    zIndex: '9999',
    padding: '16px',
    fontSize: '18px',
    color: '#0D0C22',
    position: 'fixed',
    maxWidth: '260px',
    lineHeight: '1.5',
    borderRadius: '4px',
    visibility: 'hidden',
    background: '#ffffff',
    transform: 'scale(0.7)',
    transition: '.25s ease all',
    transformOrigin: 'right bottom',
    fontFamily: '"Avenir Book", sans-serif',
    bottom: `${parseInt(config.y_margin, 10) - 2}px`,
    boxShadow:
      '0px 2px 5px rgba(0, 0, 0, 0.05), 0px 8px 40px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.15)',
  });
  messageBubble.style[config.position.toLowerCase() === 'left' ? 'left' : 'right'] =
    `${parseInt(config.x_margin, 10) + 84}px`;
  messageBubble.innerText = config.message;

  widgetOverlay.appendChild(widgetIframe);
  config.targetElement.appendChild(widgetOverlay);
  config.targetElement.appendChild(widgetButton);
  config.targetElement.appendChild(messageBubble);

  let hasBeenOpened = false;

  const openWidget = () => {
    if (!hasBeenOpened) {
      const params = new URLSearchParams({
        description: config.description,
        color: config.color.substring(1), // Remove '#' from color hex
      });
      widgetIframe.src = `https://www.buymeacoffee.com/widget/page/${config.id}?${params.toString()}`;
      hasBeenOpened = true;
    }
    hideMessageBubble();
    widgetOverlay.style.width = '100%';
    widgetOverlay.style.height = '100%';
    widgetIframe.style.height = `${iframeMaxHeight}px`;
    widgetIframe.style.transform = 'scale(1)';
    widgetIframe.style.opacity = '1';
    widgetButton.innerHTML =
      '<svg style="width: 16px;height:16px;" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.1133 0L8 6.11331L1.88669 0L0 1.88663L8 9.88663L16 1.88663L14.1133 0Z" fill="white"/></svg>';
  };

  const closeWidget = () => {
    widgetOverlay.style.width = '0';
    widgetOverlay.style.height = '0';
    widgetIframe.style.height = '0';
    widgetIframe.style.opacity = '0';
    widgetIframe.style.transform = 'scale(0)';
    widgetButton.innerHTML =
      '<img src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg" alt="Buy Me A Coffee" style="height: 36px; width: 36px; margin: 0; padding: 0;">';
  };

  const showMessageBubble = () => {
    if (config.message) {
      Object.assign(messageBubble.style, {
        opacity: '1',
        visibility: 'visible',
        transform: 'scale(1)',
      });
    }
  };

  const hideMessageBubble = () => {
    Object.assign(messageBubble.style, {
      opacity: '0',
      visibility: 'hidden',
      transform: 'scale(0.7)',
    });
  };

  widgetButton.onclick = () => {
    const isWidgetOpen = widgetOverlay.style.width === '100%';
    if (isWidgetOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  };

  widgetOverlay.onclick = closeWidget;
  widgetButton.onmouseover = () => (widgetButton.style.transform = 'scale(1.1)');
  widgetButton.onmouseleave = () => (widgetButton.style.transform = 'scale(1)');
  widgetButton.onmousedown = () => (widgetButton.style.transform = 'scale(0.95)');

  setTimeout(showMessageBubble, 500);
  setTimeout(hideMessageBubble, 5000);
};
