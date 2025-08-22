interface FormatJSWithCursorOptions {
  code: string;
  cursorOffset: number;
}

export const formatJSWithCursor = async ({ code, cursorOffset }: FormatJSWithCursorOptions) => {
  const { formatWithCursor } = await import('prettier/standalone');
  const prettierPluginEstree = (await import('prettier/plugins/estree')).default;
  const parserBabel = await import('prettier/plugins/babel');
  const result = await formatWithCursor(code, {
    cursorOffset,
    parser: 'babel',
    plugins: [parserBabel, prettierPluginEstree],
  });
  return result;
};
