import { spawnDialog } from './spawn-dialog';
import { setupMonacoEnv } from './setup-monaco-env';
import { lineColToOffset } from './line-to-col-offset';
import { getActualLineColCount } from './get-actual-line-col-count';

export const spawnEditor = async (
  initialLineNumber = 1,
  initialColNumber = 1,
  enableCursor = true,
) => {
  const pre = document.querySelector('pre');
  if (!pre) {
    console.warn('No <pre> tag found on the page.');
    return;
  }
  const monaco = await import('monaco-editor');
  const { Range, editor, Selection } = monaco;

  const prettierPluginEstree = (await import('prettier/plugins/estree')).default;
  const parserBabel = await import('prettier/plugins/babel');
  const { formatWithCursor } = await import('prettier/standalone');

  const code = pre.textContent ?? '';
  const actualLineLengths = getActualLineColCount(code);
  const maxLineLength = actualLineLengths.sort()[0]!;
  const totalLineCount = actualLineLengths.length;

  let isValidCursorLocation = true;

  if (initialLineNumber > totalLineCount) {
    spawnDialog({
      type: 'warn',
      title: 'Out of range',
      message: `Line number ${initialLineNumber} is beyond the total line count`,
    });
    isValidCursorLocation = false;
  }

  const isOutOfRange = actualLineLengths[initialLineNumber - 1] < initialColNumber;

  if (isOutOfRange) {
    spawnDialog({
      type: 'warn',
      title: 'Out of range',
      message: `Line ${initialLineNumber} has a max coloumn size of ${actualLineLengths[initialLineNumber - 1]}, you provided ${initialColNumber}`,
    });
    isValidCursorLocation = false;
  }

  const cursorOffset = isValidCursorLocation
    ? lineColToOffset(code, initialLineNumber, initialColNumber)
    : 1;

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
    maxTokenizationLineLength: maxLineLength,
  });

  editorInstance.onMouseDown((e) => {
    if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
      editorInstance.trigger('', 'editor.action.revealDefinition', {});
    }
  });

  if (isValidCursorLocation && enableCursor) {
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
            value: `⚠️ Stack trace location ${initialLineNumber}:${initialColNumber} ⚠️`,
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
};

console.log('loading done');
