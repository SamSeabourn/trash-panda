export const lineColToOffset = (text: string, line: number, col: number): number => {
  const lines = text.split('\n');
  let offset = 0;
  for (let i = 0; i < line - 1; i++) {
    offset += lines[i].length + 1;
  }
  return offset + (col - 1);
};
