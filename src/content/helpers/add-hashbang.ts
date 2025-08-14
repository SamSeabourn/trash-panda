export const addHashbang = (file: string, line: number, column: number): string => {
  return `${file}#!line=${line}&col=${column}`;
};
