export const getColor = (value, max, reverse = false) => {
  const intensity = value / max;
  const color = reverse ? 255 - intensity * 160 : 255 - (1 - intensity) * 160;
  return `rgb(255, ${color}, ${color})`;
};

export const colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00b0ff',
  '#f77f00',
  '#39e6a3',
  '#e60026',
  '#1a75ff',
  '#ff0073',
  '#9933ff',
  '#66cc99',
  '#c06c84',
  '#6c5b7b',
  '#355c7d',
  '#f67280',
  '#f8b195',
  '#355c7d',
];
