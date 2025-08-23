import { attachBMCLogic } from './attach-bmc-logic';

export const injectStatusBar = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'status-wrapper';

  const statusBarElement = document.createElement('footer');
  statusBarElement.className = 'status-bar';

  wrapper.appendChild(statusBarElement);

  document.body.appendChild(wrapper);
  attachBMCLogic({ targetElement: wrapper });
};
