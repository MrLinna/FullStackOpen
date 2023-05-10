export const Suffix = ({ value }) =>
  value > 1000
    ? String((value / 1000).toFixed(1)).replace(/\.0+$/, "") + "k"
    : value;
