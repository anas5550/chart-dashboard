export const getColor = (value, max, reverse = false) => {
  const intensity = value / max;
  const color = reverse ? 255 - intensity * 160 : 255 - (1 - intensity) * 160;
  return `rgb(255, ${color}, ${color})`;
};
