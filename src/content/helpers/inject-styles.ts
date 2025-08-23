import { THEME } from '../constants/theme';
import { isDarkMode } from './is-dark-mode';

export const injectStyles = () => {
  const pageStyles = `
  body {
    margin: 0;
    height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
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

  .dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .dialog {
    background: rgba(227, 227, 227, 1);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    max-width: 300px;
    color: rgba(17, 0, 24, 1);
    border-top: 5px solid transparent;
    width: 100%;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    text-align: center;
  }

  .warn {
    border-top: 5px solid orange;
  }

  .error {
    border-top: 5px solid red;
  }

  .dialog-issues-url {
    text-decoration: none;
    margin-bottom: 16px;
    color: #b047caff;
  }

  .button {
    padding: 8px 25px;
    margin: 4px;
    border: 4px solid #333;
    border-radius: 12px;
    background-color: #f0f0f0;
    color: #333;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0px 8px 0px #000;
    transition: all 0.2s ease;
    outline: none;
}

  .button:disabled {
      pointer-events: none;
      background: lightgray;
      cursor: not-allowed;
      color: #5b5b5b;
      box-shadow: 0px 4px 0px #575757;
  }

  .button:hover {
      background-color: #b047caff;
      box-shadow: 0px 4px 0px #000;
      transform: translateY(4px);
  }

  .button:active {
      background-color: #e0e0e0;
      box-shadow: 0px 0px 0px #000;
      transform: translateY(8px);
  }

  .status-bar {
      padding-left: 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
      width: 100vw;
      height: 30px;
      bottom: 0;
      position: fixed;
      background-image: linear-gradient(90deg, ${THEME.DARK.BACKGROUND}, #38074dff, #ba0fb4ff);
      background-size: 400% 100%;
      animation: gradient-animation 35s ease infinite alternate;
  }

  .cooper {
    width: 200px;
  }
  
  .splash-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${isDarkMode() ? THEME.DARK.BACKGROUND : THEME.LIGHT.BACKGROUND} ;
    position: absolute;
    height: 100%;
    display: flex;
    z-index: 10001;
  }

  .splash-logo {
    width: 420px;
  }

  .bubble {
      position: relative;
      background: #ffffff;
      color: #5d0970;
      font-family: Arial;
      font-size: 1rem;
      line-height: 35px;
      box-shadow: 0px 0px 39px 0px #000);
      text-align: center;
      border-radius: 27px;
      padding: 0px 18px;
  }

  .bubble:after {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      z-index: 1;
      border-style: solid;
      border-color: #ffffff transparent;
      border-width: 20px 10px 0;
      bottom: -20px;
      left: 50%;
      margin-left: -20px;
  }

  .splash-loading-text {
    animation: breathing 1s ease-in-out infinite alternate;
  }

    @keyframes gradient-animation {
      0% {
          background-position: 0% 50%;
      }
      50% {
          background-position: 100% 50%;
      }
      100% {
          background-position: 0% 50%;
      }
  }

  @keyframes breathing {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }




`;
  const style = document.createElement('style');
  style.id = '🦝💅';
  style.type = 'text/css';
  style.innerText = pageStyles;
  document.head.appendChild(style);
};
