export const hexToRgb = (hexColor) => {
  const color = hexColor.replace('#', '');
  const hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(color) || (color.length !== 3 && color.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  const first = color.length === 3 ? color[0] + color[0] : color[0] + color[1];
  const middle = color.length === 3 ? color[1] + color[1] : color[2] + color[3];
  const last = color.length === 3 ? color[2] + color[2] : color[4] + color[5];
  return `${parseInt(first, 16)}, ${parseInt(middle, 16)}, ${parseInt(
    last,
    16,
  )}`;
};
