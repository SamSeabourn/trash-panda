import { THEME } from '../constants/theme';

export const clearPage = () => {
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.documentElement.removeAttribute('style');
  document.body.removeAttribute('style');
  // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = false;

  document.body.style.background = isDarkMode ? THEME.DARK.BACKGROUND : THEME.LIGHT.BACKGROUND;
};
