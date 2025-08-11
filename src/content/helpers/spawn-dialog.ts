type DialogTypes = 'error' | 'warn' | 'genenric';

interface Options {
  type: DialogTypes;
  message: string;
  title: string;
}

export const spawnDialog = ({ type, title, message }: Options) => {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';

  const dialog = document.createElement('div');
  dialog.className = `dialog ${type}`;
  dialog.innerHTML = `
    <h1>${title}</h1>
    <p>${message}</p>
    ${type === 'error' ? `<p><a class="dialog-issues-url" href="https://github.com/SamSeabourn/trash-panda/issues" target="_blank">Please report here</a></p>` : ''}
    <button class="dialog-close button">Close</button>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', close);
};
