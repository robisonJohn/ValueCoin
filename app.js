const DOMAIN = 'https://api.nomics.com/v1/';
const API_KEY = '72bff06951afffa16deee193a86a1802ea2d39d1';
const BASE_URL = `${DOMAIN}currencies/ticker?key=${API_KEY}`;
// sample url: https://api.nomics.com/v1/currencies/ticker?key=72bff06951afffa16deee193a86a1802ea2d39d1&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1
/* components: 
base url: https://api.nomics.com/v1/
currencies/
ticker?
key=72bff06951afffa16deee193a86a1802ea2d39d1
&ids=BTC,ETH,XRP
&interval=1d,30d
&convert=EUR
&per-page=100
&page=1
*/
//=================================================
// GLOBAL VARIABLES
//=================================================
const input = document.querySelector('#input');
const submit = document.querySelector('#search');
const cryptoInfo = document.querySelector('.crypto-info');

//=================================================
// PRIMARY METHODS
//=================================================

// the clearDiv method will remove prior entries before calling new entries
const clearDiv = () => {
    while (cryptoInfo.childNodes.length) {
        cryptoInfo.childNodes[0].remove();
    }
};

// the event listener will call the searchNomics function on the given url upon clicking the button
// note: for now, we are inputting a static url to ensure it works. We will add in the input value later.
submit.addEventListener('click', () => {
    const url;
    searchCoinAPI(url);
});
const searchCoinGecko = async (url) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);

    } catch (error) {
        console.error(error.message);
    }
    
};

const url1 = 

searchNomics(url1);

// Axios call to process API

// Mathematical Variables and Functions
// Price

// Velocity of Money --> relative "health" of the currency

// Volatility of prices --> relative stability of the currency

// Expected returns --> ability for the currency to serve as a store or enhancer of value

// Social Volume --> how much hype the currency accrues over time

/* compareTo() function --> if the price of an asset is lower, its velocity is higher, and its volatility is lower, 
this coin is more stable than the other coin and thus has a greater long-term upside potential. If the other coin has a higher 
price, a greater social volume, and larger expected returns, this is the coin with the larger short-term upside potential*/
