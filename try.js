/*
LUNAR CRUSH API
*/
// so how should we proceed?
// first, fetch the data from the url. 
// second, convert the useful data into variables.
// third, assign these variable values to components of the HTML document.
const BASE_URL = 'https://api.lunarcrush.com/v2?data=assets&key=gwdbw0jz0hfr6fveqfmg2r&symbol=BTC';
//console.log(sampleUrl);

const input = document.getElementById('input');
console.log(input);
const submit = document.getElementById('submit');
const cryptoInfo = document.querySelector('.crypto-info');
console.log(submit);

const clearDiv = () => {
    while (cryptoInfo.childNodes.length) {
        cryptoInfo.childNodes[0].remove();
    }
};

submit.addEventListener("click", () => {
    const sampleUrl = 'https://api.lunarcrush.com/v2?data=assets&key=gwdbw0jz0hfr6fveqfmg2r&symbol=BTC';
    searchLunarCrush(sampleUrl);

});

const searchLunarCrush = async (url) => {
    try {
        let response = await axios.get(url);
        
        const data = response.data;
        // clearDiv();
        processData(data);
    } catch (error) {
        console.error(error.message);
    }
};


const processData = (sampleData) => {
    const coinData = sampleData.data;
    console.log(coinData);
    
    const newAsset = document.createElement('div');
    newAsset.className = 'new-asset';

    const name = document.createElement('p');
    name.innerHTML = `<strong>Asset name: </strong>${coinData[0].name}`;
    newAsset.appendChild(name);

    const symbol = document.createElement('p');
    symbol.innerHTML = `<strong>Asset symbol: </strong>${coinData[0].symbol}`;
    newAsset.appendChild(symbol);

    const price = document.createElement('p');
    price.innerHTML = `<strong>Current asset price: </strong>$${coinData[0].price}`;
    newAsset.appendChild(price);

    const marketCap = document.createElement('p');
    marketCap.innerHTML = `<strong>Current asset market capitalization, in USD: </strong>$${coinData[0].market_cap_global}`;
    newAsset.appendChild(marketCap);

    const volume = document.createElement('p');
    volume.innerHTML = `<strong>Transaction volume over the last 24 hours, in USD: </strong>$${coinData[0].volume_24h}`; // volume in USD for 24 hours up to this data point
    newAsset.appendChild(volume);

    const velocity = document.createElement('p');
    velocity.innerHTML = `<strong>The velocity of this crypto-currency is </strong>${
        coinData[0].volume_24h * coinData[0].price / coinData[0].market_cap_global
    }`
    newAsset.appendChild(velocity);

    const change24h = document.createElement('p');
    change24h.innerHTML = `<strong>Percent change in price over the last 24 hours: </strong> ${coinData[0].percent_change_24h}%`; // use to track recent changes
    newAsset.appendChild(change24h);

    const change7d = document.createElement('p');
    change7d.innerHTML = `<strong> Percent change in price over the last seven days: </strong> ${coinData[0].percent_change_7d}%`;
    newAsset.appendChild(change7d);

    const change30d = document.createElement('p');
    change30d.innerHTML = `<strong> Percent change in price over the last 30 days: </strong> ${coinData[0].percent_change_30d}%`;
    newAsset.appendChild(change30d);

    cryptoInfo.appendChild(newAsset);
    //console.log();



};


// Information of Interest: 

/*
COIN API

const sampleUrl = 'https://rest.coinapi.io/v1/exchangerate/BTC?apikey=ADA90FA7-E1D9-4F5F-93BA-98EAA3D6BED7';
console.log(sampleUrl);


const searchCoinApi = async (url) => {
    try {
        let response = await axios.get(url);
        console.log(response);
        const data = response.data;
        console.log(data);
        console.log(data.rates);

    } catch (error) {
        console.error(error.message);
    }
};
*/

//searchCoinApi(sampleUrl);


