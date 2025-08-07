export const injectStyles = () => {
  const pageStyles = `
  body {
    margin: 0;
    height: 100vh;
  }

  pre {
    height: 0 !important;
    display: none !important;
  }

  .error-line-highlight {
    background-color: rgba(255, 13, 0, 0.41);
  }

  .error-gutter-icon::before {
    content: '🦝';
    font-size: 16px;
    line-height: 1;
    display: inline-block;
    width: 100%;
    transform: scaleX(-1);
    text-align: center;
  }

  .my-inline-tooltip::after {
    content: '👉';
    display: inline-block;
    animation: point 0.8s ease-in-out infinite;
    transform-origin: center right;
  }

  @keyframes point {
    0%, 100% {
      transform: translateX(-4px);
    }
    50% {
      transform: translateX(0px);
    }
  }
`;
  const style = document.createElement('style');
  style.id = '🦝💅';
  style.type = 'text/css';
  style.innerText = pageStyles;
  document.head.appendChild(style);
};
