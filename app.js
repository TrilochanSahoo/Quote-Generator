let apiQuote = []
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnTwitter = document.getElementById('button-twitter');
const btnNewQuote = document.getElementById('button-new');
const loader = document.getElementById('loader');

function showLoader(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function hideLoader(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    // to pick a random quote
    const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
    return quote;
}

//use Api to get the quotes
async function getQuote(){
    showLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        const data = newQuote();
        console.log(data)
        if(authorText===null)
        {
            authorText.innerText = 'Unknown';   
        }
        else{
            authorText.innerText = data.author;
        }
        if (quoteText.length>120){
            quoteText.classList.add('long-quote')
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.text;
    }
    catch(error){
        getQuote();
    }
    hideLoader();

}

function shareQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const fUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(fUrl,'_blank')
}

btnNewQuote.addEventListener('click',getQuote);
btnTwitter.addEventListener('click',shareQuote);

//call the function
getQuote()