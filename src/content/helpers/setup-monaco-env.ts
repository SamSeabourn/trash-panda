export const setupMonacoEnv = () => {
  (self as any).MonacoEnvironment = {
    getWorker() {
      return {
        terminate() {},
        postMessage() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      };
    },
  };
};
