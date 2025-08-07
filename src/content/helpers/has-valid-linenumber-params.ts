export const hasValidLinenumberParams = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const line = parsed.searchParams.get('line');
    const column = parsed.searchParams.get('column');
    return line !== null && column !== null && !isNaN(Number(line)) && !isNaN(Number(column));
  } catch {
    return false;
  }
};
