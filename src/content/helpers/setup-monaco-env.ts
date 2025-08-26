// A dummy worker object with empty methods to prevent errors.
const dummyWorker = {
  onerror: null,
  getWorker() {},
  terminate() {},
  onmessage: null,
  postMessage() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
};

export const setupMonacoEnv = () => {
  (self as any).MonacoEnvironment = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getWorker(_workerId: string, _label: string) {
      return dummyWorker;
    },
  };
};
