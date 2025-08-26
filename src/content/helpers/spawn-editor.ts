import { isDarkMode } from './is-dark-mode';
import { spawnDialog } from './spawn-dialog';
import { destroySplash } from './destroy-splash';
import { setupMonacoEnv } from './setup-monaco-env';
import { lineColToOffset } from './line-to-col-offset';
import { injectStatusBar } from './inject-status-bar-nodes';
import { formatJSWithCursor } from './format-js-with-cursor';
import { getActualLineColCount } from './get-actual-line-col-count';

interface SpawnEditorOptions {
  sourceCode: string;
  initialLineNumber: number;
  initialColNumber: number;
  enableCursor: boolean;
  fileType?: 'html' | 'js';
}

export const spawnEditor = async ({
  sourceCode,
  enableCursor,
  initialColNumber,
  initialLineNumber,
}: SpawnEditorOptions) => {
  const monaco = await import('monaco-editor');
  const { Range, editor, Selection } = monaco;

  const code = sourceCode;

  const actualLineLengths = getActualLineColCount(code);
  const maxLineLength = Math.max(...actualLineLengths);
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
      message: `Line ${initialLineNumber} has a max character count of ${actualLineLengths[initialLineNumber - 1]}, you provided ${initialColNumber}`,
    });
    isValidCursorLocation = false;
  }

  const cursorOffset = isValidCursorLocation
    ? lineColToOffset(code, initialLineNumber, initialColNumber)
    : 1;

  const formatResult = await formatJSWithCursor({ code, cursorOffset });

  const editorPosition = document.createElement('div');
  editorPosition.id = 'editor';
  document.body.appendChild(editorPosition);
  const editorWrapper = document.getElementById('editor')!;
  editorWrapper.style.height = 'calc(100vh - 20px)';
  editorWrapper.style.width = '100vw';

  setupMonacoEnv();

  const editorInstance = editor.create(editorWrapper!, {
    readOnly: true,
    glyphMargin: true,
    automaticLayout: true,
    language: 'javascript',
    value: formatResult!.formatted,
    theme: isDarkMode() ? 'vs-dark' : 'vs',
    maxTokenizationLineLength: maxLineLength,
  });

  injectStatusBar();

  editorInstance.onMouseDown((e) => {
    if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
      editorInstance.trigger('', 'editor.action.revealDefinition', {});
    }
  });

  if (isValidCursorLocation && enableCursor) {
    const model = editorInstance.getModel()!;
    const position = model.getPositionAt(formatResult!.cursorOffset);
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

  setTimeout(() => {
    destroySplash();
  }, 500);
};
