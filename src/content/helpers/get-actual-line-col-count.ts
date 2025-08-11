export const getActualLineColCount = (code: string) => {
  return code.split(/\r?\n/).map((line) => line.length);
};
