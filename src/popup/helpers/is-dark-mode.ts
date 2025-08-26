export const isDarkMode = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }

  if (window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
    return true; //Default dark, always default darks
  }

  return false;
};
