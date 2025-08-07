export const splitUrlAndLineNumber = (
  url: string,
): {
  baseUrl: string;
  line?: number;
  column?: number;
} => {
  const match = url.match(/^(.*):(\d+):(\d+)$/);
  if (!match) {
    return { baseUrl: url };
  }
  const [, baseUrl, lineStr, colStr] = match;
  return {
    baseUrl,
    line: parseInt(lineStr, 10),
    column: parseInt(colStr, 10),
  };
};
