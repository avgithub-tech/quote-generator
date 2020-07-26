const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }

  // Remove Loading Spinner
function removeLoader() {
    if (!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
    }
  }

//Get quote from API
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
    showLoader();
try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    // Check if Author field is blank and replace it with 'Unknown'
    if (data.author === '') {
        authorText.innerText = 'Unknown';
      } else {
        authorText.innerText = data.author;
      }
    // Dynamically reduce font size for long quotes
    if (data.quote.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      authorText.innerText = data.author;
    quoteText.innerText = data.quote;
    removeLoader();
} catch(error){
    // getQuote();
    console.log('Error while fetching quote',error);
    removeLoader();
}

}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
  }

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuote();
