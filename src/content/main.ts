import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';

const hasLineNumberSuffix = (url: string) => {
  return /:\d+:\d+$/.test(url);
};

const appendLineAndColumn = (url: string, line: number, column: number): string => {
  try {
    const parsed = new URL(url);

    parsed.searchParams.set('line', String(line));
    parsed.searchParams.set('column', String(column));

    return parsed.toString();
  } catch {
    // fallback for relative URLs
    const [base, rest = ''] = url.split(/[?#]/);
    const search = new URLSearchParams(rest.includes('?') ? rest.split('?')[1] : '');
    const hash = rest.includes('#') ? '#' + rest.split('#')[1] : '';

    search.set('line', String(line));
    search.set('column', String(column));

    return `${base}?${search.toString()}${hash}`;
  }
};

const addBounceCSS = () => {
  const style = document.createElement('style');
  style.textContent = `
    .floating-caret {
      position: absolute;
      animation: bounce-pointer 1s infinite ease-in-out;
      color: red;
      font-size: 18px;
      line-height: 1;
      pointer-events: none;
      will-change: transform;
      display: inline-block;
    }

    @keyframes bounce-pointer {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
  `;
  document.head.appendChild(style);
};

const lineColToOffset = (text: string, line: number, col: number): number => {
  const lines = text.split('\n');
  let offset = 0;
  for (let i = 0; i < line - 1; i++) {
    offset += lines[i].length + 1;
  }
  return offset + (col - 1);
};

const formatPreTagContent = async (line: number, column: number) => {
  const pre = document.querySelector('pre');
  if (!pre) {
    console.warn('No <pre> tag found on the page.');
    return;
  }

  const code = pre.textContent ?? '';
  const cursorOffset = lineColToOffset(code, line, column);

  const result = await prettier.formatWithCursor(code, {
    cursorOffset,
    parser: 'babel',
    plugins: [parserBabel, prettierPluginEstree],
  });

  // Use a real DOM marker
  const markerSpan = '<span id="caret-marker"></span>';
  const codeWithMarker =
    result.formatted.slice(0, result.cursorOffset) +
    markerSpan +
    result.formatted.slice(result.cursorOffset);

  pre.innerHTML = codeWithMarker;

  await new Promise((res) => requestAnimationFrame(res));

  const markerEl = document.getElementById('caret-marker');
  if (!markerEl) return;
  markerEl.style.background = 'red';
  markerEl.style.display = 'inline-block';
  markerEl.style.width = '2px';
  markerEl.style.height = '12px';

  const rect = markerEl.getBoundingClientRect();
  const EMOJI_FINGER_OFFSET = -11;
  const EMOJI_LIFT_OFFSET = -7;
  const caret = document.createElement('div');
  caret.textContent = '👇';
  caret.className = 'floating-caret';
  Object.assign(caret.style, {
    padding: '0',
    zIndex: '9999',
    color: 'white',
    lineHeight: '1',
    fontSize: '14px',
    borderRadius: '0%',
    position: 'absolute',
    pointerEvents: 'none',
    top: `${rect.top + window.scrollY + EMOJI_LIFT_OFFSET}px`,
    left: `${rect.left + window.scrollX + EMOJI_FINGER_OFFSET}px`,
  });

  document.body.appendChild(caret);

  markerEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  addBounceCSS();

  setTimeout(() => {
    markerEl.remove();
    // Can use primsm for styling here if you want
  }, 1000);
};

const hasValidLineAndColumnParams = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const line = parsed.searchParams.get('line');
    const column = parsed.searchParams.get('column');
    return line !== null && column !== null && !isNaN(Number(line)) && !isNaN(Number(column));
  } catch {
    return false;
  }
};

const splitUrlAndLineNumber = (
  url: string,
): {
  baseUrl: string;
  line?: number;
  column?: number;
} => {
  const match = url.match(/^(.*):(\d+):(\d+)$/);
  if (!match) {
    return { baseUrl: url };
  }
  const [, baseUrl, lineStr, colStr] = match;
  return {
    baseUrl,
    line: parseInt(lineStr, 10),
    column: parseInt(colStr, 10),
  };
};

if (hasLineNumberSuffix(window.location.href)) {
  const { line, column, baseUrl } = splitUrlAndLineNumber(window.location.href);
  if (line && baseUrl && column) {
    window.location.href = appendLineAndColumn(baseUrl, line, column);
  }
}

if (hasValidLineAndColumnParams(window.location.href)) {
  console.log('do shit here');
  const parsed = new URL(window.location.href);
  const line = Number(parsed.searchParams.get('line'));
  const column = Number(parsed.searchParams.get('column'));
  formatPreTagContent(line, column);
}
