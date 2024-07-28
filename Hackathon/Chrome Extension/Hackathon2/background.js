chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendHighlight",
      title: "Send Highlighted Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendHighlight") {
      chrome.tabs.sendMessage(tab.id, { action: "getHighlight" });
    }
  });
  