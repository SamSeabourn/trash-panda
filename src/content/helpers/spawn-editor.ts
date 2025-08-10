import { setupMonacoEnv } from './setup-monaco-env';
import { lineColToOffset } from './line-to-col-offset';

export const spawnEditor = async (
  initialLineNumber = 1,
  initialColumn = 1,
  enableCursor = true,
) => {
  const { Range, editor, Selection } = await import('monaco-editor');
  const prettierPluginEstree = (await import('prettier/plugins/estree')).default;
  const parserBabel = await import('prettier/plugins/babel');
  const { formatWithCursor } = await import('prettier/standalone');

  const pre = document.querySelector('pre');
  if (!pre) {
    console.warn('No <pre> tag found on the page.');
    return;
  }

  const code = pre.textContent ?? '';
  let cursorOffset = lineColToOffset(code, initialLineNumber, initialColumn);

  if (cursorOffset > code.length) {
    // TODO: This is a bit ghetto.. need to check the line and col to validate properly
    console.error('Out of range error');
    cursorOffset = 1;
  }

  const result = await formatWithCursor(code, {
    cursorOffset,
    parser: 'babel',
    plugins: [parserBabel, prettierPluginEstree],
  });

  const editorPosition = document.createElement('div');
  editorPosition.id = 'editor';
  document.body.appendChild(editorPosition);
  const editorWrapper = document.getElementById('editor')!;
  editorWrapper.style.height = '100vh';
  editorWrapper.style.width = '100vw';

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  setupMonacoEnv();
  const editorInstance = editor.create(editorWrapper!, {
    readOnly: true,
    glyphMargin: true,
    automaticLayout: false,
    language: 'javascript',
    value: result.formatted,
    theme: isDarkMode ? 'vs-dark' : 'vs',
  });

  if (enableCursor) {
    const model = editorInstance.getModel()!;
    const position = model.getPositionAt(result.cursorOffset);
    editorInstance.createDecorationsCollection([
      {
        range: new Range(
          position.lineNumber,
          position.column - 1,
          position.lineNumber,
          position.column,
        ),
        options: {
          inlineClassName: 'my-inline-tooltip',
          hoverMessage: {
            value: `⚠️ Stack trace location ⚠️`,
          },
        },
      },
    ]);

    editorInstance.revealPositionInCenter(position);
    const lineLength = editorInstance.getModel()!.getLineLength(position.lineNumber);

    editorInstance.setSelection(
      new Selection(position.lineNumber, 1, position.lineNumber, lineLength + 1),
    );

    editorInstance.createDecorationsCollection([
      {
        range: new Range(position.lineNumber, 1, position.lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'error-line-highlight',
          glyphMarginClassName: 'error-gutter-icon',
        },
      },
    ]);
  }
  console.log('loading done');
};
