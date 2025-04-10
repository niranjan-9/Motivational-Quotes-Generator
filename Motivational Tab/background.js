chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.sync.set({ quotes: [] }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting initial storage:', chrome.runtime.lastError);
      } else {
        console.log('Initial storage set successfully.');
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getQuote') {
    fetch('https://zenquotes.io/api/random')
      .then(response => response.json())
      .then(data => {
        const quote = data[0].q;
        sendResponse({ quote: quote });
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        sendResponse({ quote: 'Failed to fetch a new quote. Please try again later.' });
      });
  }
  return true;
});
