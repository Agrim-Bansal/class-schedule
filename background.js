const API_KEY = 'API_KEY';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ API_KEY });
});