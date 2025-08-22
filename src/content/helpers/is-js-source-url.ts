export const isJSSourceURL = (url: string) => {
  return /\.js:\d+:\d+$/.test(url);
};
