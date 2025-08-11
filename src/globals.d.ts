declare global {
  interface Window {
    MonacoEnvironment: Environment;
  }
}

declare module 'monaco-editor/esm/vs/basic-languages/javascript/javascript';

window.MonacoEnvironment = {
  getWorker(workerId, label) {
    switch (label) {
      case 'css':
        return new CssWorker();
      case 'editorWorkerService':
        return new MonacoWorker();
      case 'json':
        return new JsonWorker();
      case 'yaml':
        return new YamlWorker();
      default:
        throw new Error(`Unknown label ${label}`);
    }
  },
};
