import { setupCounter } from './counter.ts';
import './style.css';

document.querySelector('#app')!.innerHTML = `
  <div>
    <span>Hi Im a WIP :)<span>
  </div>
`;

setupCounter(document.querySelector('#counter')!);
