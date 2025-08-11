import { spawnDialog } from './spawn-dialog';
import { setupMonacoEnv } from './setup-monaco-env';
import { lineColToOffset } from './line-to-col-offset';
import { getActualLineColCount } from './get-actual-line-col-count';

export const spawnEditor = async (
  initialLineNumber = 1,
  initialColumn = 1,
  enableCursor = true,
) => {
  const pre = document.querySelector('pre');
  if (!pre) {
    console.warn('No <pre> tag found on the page.');
    return;
  }
  const monaco = await import('monaco-editor/esm/vs/editor/editor.api');
  const jsModule = await import('monaco-editor/esm/vs/basic-languages/javascript/javascript');
  monaco.languages.register({ id: 'javascript' });
  monaco.languages.setMonarchTokensProvider('javascript', jsModule.language);
  monaco.languages.setLanguageConfiguration('javascript', jsModule.conf);
  const { Range, editor, Selection } = monaco;

  const prettierPluginEstree = (await import('prettier/plugins/estree')).default;
  const parserBabel = await import('prettier/plugins/babel');
  const { formatWithCursor } = await import('prettier/standalone');

  const code = pre.textContent ?? '';
  const actualLineLengths = getActualLineColCount(code);

  const isOutOfRange = actualLineLengths[initialLineNumber - 1] < initialColumn;

  if (isOutOfRange) {
    spawnDialog({
      type: 'warn',
      title: 'Out of range',
      message: `Line ${initialLineNumber} has a max coloumn size of ${actualLineLengths[initialLineNumber - 1]}, you provided ${initialColumn}`,
    });
  }

  const cursorOffset = lineColToOffset(code, initialLineNumber, initialColumn);

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
    automaticLayout: true,
    language: 'javascript',
    value: result.formatted,
    theme: isDarkMode ? 'vs-dark' : 'vs',
  });

  if (enableCursor && !isOutOfRange) {
    const model = editorInstance.getModel()!;
    const position = model.getPositionAt(result.cursorOffset);
    editorInstance.createDecorationsCollection([
      {
        range: new Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column,
        ),
        options: {
          beforeContentClassName: 'my-inline-tooltip',
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
