import * as monaco from 'monaco-editor';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';

import { lineColToOffset } from './line-to-col-offset';

export const spawnEditor = async (initialLineNumber: number, initialColumn: number) => {
  const pre = document.querySelector('pre');
  if (!pre) {
    console.warn('No <pre> tag found on the page.');
    return;
  }

  const code = pre.textContent ?? '';
  const cursorOffset = lineColToOffset(code, initialLineNumber, initialColumn);

  const result = await prettier.formatWithCursor(code, {
    cursorOffset,
    parser: 'babel',
    plugins: [parserBabel, prettierPluginEstree],
  });

  const editorPosition = document.createElement('div');
  editorPosition.id = 'editor';
  document.body.appendChild(editorPosition);
  const editorWrapper = document.getElementById('editor')!;
  editorWrapper.style.height = '100vh';
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const editor = monaco.editor.create(editorWrapper!, {
    glyphMargin: true,
    automaticLayout: false,
    language: 'javascript',
    value: result.formatted,
    theme: isDarkMode ? 'vs-dark' : 'vs',
  });
  const model = editor.getModel()!;
  const position = model.getPositionAt(result.cursorOffset);

  editor.createDecorationsCollection([
    {
      range: new monaco.Range(
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

  editor.revealPositionInCenter(position);
  const lineLength = editor.getModel()!.getLineLength(position.lineNumber);

  editor.setSelection(
    new monaco.Selection(position.lineNumber, 1, position.lineNumber, lineLength + 1),
  );

  editor.createDecorationsCollection([
    {
      range: new monaco.Range(position.lineNumber, 1, position.lineNumber, 1),
      options: {
        isWholeLine: true,
        className: 'error-line-highlight',
        glyphMarginClassName: 'error-gutter-icon',
      },
    },
  ]);
};
