chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  await chrome.sidePanel.setOptions({
    tabId,
    path: '/src/sidepanel.html',
    enabled: true
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "../assets/icons/128x128icon.png",
    title: "Extension Installed",
    message: "Thank you for installing our extension!"
  });

  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id && tab.url && tab.url.startsWith('http')) {
        chrome.sidePanel.setOptions({
          tabId: tab.id,
          path: '/src/sidepanel.html',
          enabled: true
        });
      }
    }
  });
});

chrome.runtime.setUninstallURL("https://chromewebstore.google.com/detail/html-css-code-viewer/dgildcjamghbgngmnmegikihfcopnmlg/reviews");
