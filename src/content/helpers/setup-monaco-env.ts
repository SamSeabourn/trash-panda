const createWorkerFromUrl = (url: string) => {
  const code = `importScripts("${url}");`;
  const blob = new Blob([code], { type: 'application/javascript' });
  const blobUrl = URL.createObjectURL(blob);
  return new Worker(blobUrl, { type: 'classic' });
};

export const setupMonacoEnv = () => {
  (self as any).MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === 'typescript' || label === 'javascript') {
        return createWorkerFromUrl(
          chrome.runtime.getURL('assets/monaco-workers/ts.worker.bundle.js'),
        );
      }
      if (label === 'html') {
        return createWorkerFromUrl(
          chrome.runtime.getURL('assets/monaco-workers/html.worker.bundle.js'),
        );
      }
      if (label === 'editorWorkerService') {
        return createWorkerFromUrl(
          chrome.runtime.getURL('assets/monaco-workers/editor.worker.bundle.js'),
        );
      }
      // Stub other workers (for now )
      return () => ({
        terminate() {},
        postMessage() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      });
    },
  };
};
