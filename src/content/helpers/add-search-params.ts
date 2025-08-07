export const addSearchParams = (url: string, line: number, column: number): string => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('line', String(line));
    parsed.searchParams.set('column', String(column));
    return parsed.toString();
  } catch {
    const [base, rest = ''] = url.split(/[?#]/);
    const search = new URLSearchParams(rest.includes('?') ? rest.split('?')[1] : '');
    const hash = rest.includes('#') ? '#' + rest.split('#')[1] : '';
    search.set('line', String(line));
    search.set('column', String(column));
    return `${base}?${search.toString()}${hash}`;
  }
};
