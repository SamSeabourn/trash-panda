export const hasValidHashPrameters = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const hash = parsed.hash; // e.g. "#!line=1&col=3"
    if (!hash.startsWith('#!')) {
      return false;
    }
    const params = new URLSearchParams(hash.slice(2)); // remove "#!"
    const line = params.get('line');
    const col = params.get('col');
    return line !== null && col !== null && !isNaN(Number(line)) && !isNaN(Number(col));
  } catch {
    const hashIndex = url.indexOf('#!');
    if (hashIndex === -1) return false;

    const hashParams = new URLSearchParams(url.slice(hashIndex + 2));
    const line = hashParams.get('line');
    const col = hashParams.get('col');
    return line !== null && col !== null && !isNaN(Number(line)) && !isNaN(Number(col));
  }
};
