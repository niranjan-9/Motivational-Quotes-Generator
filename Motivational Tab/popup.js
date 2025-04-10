document.addEventListener('DOMContentLoaded', function() {
  const quoteElement = document.getElementById('quote');
  const newQuoteButton = document.getElementById('newQuoteButton');

  // Function to fetch a quote from the Zen Quotes API
  function getNewQuote() {
    fetch('https://zenquotes.io/api/random')
      .then(response => response.json())
      .then(data => {
        quoteElement.innerText = data[0].q;
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        quoteElement.innerText = 'Failed to fetch a new quote. Please try again later.';
      });
  }

  // Initial quote fetch
  getNewQuote();

  // Event listener for the "New Quote" button
  newQuoteButton.addEventListener('click', getNewQuote);
});
