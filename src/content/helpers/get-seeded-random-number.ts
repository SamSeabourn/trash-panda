export const getSeededRandomNumber = (seed: number, max: number, min = 0) => {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * (max - min + 1)) + min;
};
