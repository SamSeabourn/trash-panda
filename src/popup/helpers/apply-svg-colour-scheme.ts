const DARK_SHIFT = -100;
const LIGHT_SHIFT = 50;
const BASE_COLOR_PLACE_HOLDER = 'rgb(0,0,255)';
const LIGHT_COLOR_PLACE_HOLDER = 'rgb(0,255,0)';
const DARK_COLOR_PLACE_HOLDER = 'rgb(255,0,0)';

export const applySVGColourScheme = (svgString: string, rgbString: string) => {
  const [r, g, b] = rgbString
    .toLowerCase()
    .replace('rgb(', '')
    .replaceAll(')', '')
    .split(',')
    .map((number) => Number(number));

  const darkColor = `rgb(${r + DARK_SHIFT},${g + DARK_SHIFT + 30},${b + DARK_SHIFT - 30})`;
  const lightColor = `rgb(${r + LIGHT_SHIFT + 30},${g + LIGHT_SHIFT + 0},${b + LIGHT_SHIFT + 30})`;
  const baseColor = `rgb(${r},${g},${b})`;

  const resultString = svgString
    .replaceAll(BASE_COLOR_PLACE_HOLDER, baseColor)
    .replaceAll(LIGHT_COLOR_PLACE_HOLDER, lightColor)
    .replaceAll(DARK_COLOR_PLACE_HOLDER, darkColor);

  console.log({ svgString, resultString });

  return resultString;
};
