export const patchMonacoUrls = () => {
  // KLUDGE: Monaco has tries to fetch from based on the origin and gets 404's, so monkey patch its internal loader
  const originalAppendChild = document.head.appendChild as any;
  document.head.appendChild = function <T extends Node>(node: T): T {
    if (node instanceof HTMLLinkElement && node.href) {
      if (node.href.includes(window.location.origin + '/assets/')) {
        const baseExtensionURL = chrome.runtime.getURL('/');
        const urlSplit = node.href.toString().split('/');
        const assetName = urlSplit.pop();
        const realAssetUrl = baseExtensionURL + 'assets/' + assetName;
        node.href = realAssetUrl;
      }
    }
    return originalAppendChild.call(document.head, node);
  };
};
