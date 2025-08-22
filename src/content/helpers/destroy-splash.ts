export const destroySplash = () => {
  const loader = document.querySelector('.splash-page');
  if (loader) {
    loader.remove();
  }
};
