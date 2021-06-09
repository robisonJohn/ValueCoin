/*
LUNAR CRUSH API
*/
// so how should we proceed?
// first, fetch the data from the url. 
// second, convert the useful data into variables.
// third, assign these variable values to components of the HTML document.
const BASE_URL = 'https://api.lunarcrush.com/v2?data=assets&key=gwdbw0jz0hfr6fveqfmg2r&symbol=BTC';
//console.log(sampleUrl);

// Submission One
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const cryptoInfo = document.querySelector('.crypto-info');

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
        clearDiv();
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
    volume.innerHTML = `<strong>Transaction volume over prior 24 hours, in USD: </strong>$${coinData[0].volume_24h}`; // volume in USD for 24 hours up to this data point
    newAsset.appendChild(volume);

    const velocity = document.createElement('p');
    velocity.innerHTML = `<strong>Velocity of crypto-currency: </strong>${
        Math.floor(coinData[0].volume_24h * coinData[0].price / coinData[0].market_cap_global)
    }`
    newAsset.appendChild(velocity);

    const change24h = document.createElement('p');
    change24h.innerHTML = `<strong>Percent change in price over the last 24 hours: </strong> ${coinData[0].percent_change_24h}%`; // use to track recent changes
    newAsset.appendChild(change24h);
    
    const return24h = document.createElement('p');
    return24h.innerHTML = `<strong>Expected return on investment over prior 24 hours: </strong> $${
        Math.floor(coinData[0].percent_change_24h * coinData[0].price / 100)
    }`; // use to track recent changes
    newAsset.appendChild(return24h);

    const change7d = document.createElement('p');
    change7d.innerHTML = `<strong> Percent change in price over prior 7 days: </strong> ${coinData[0].percent_change_7d}%`;
    newAsset.appendChild(change7d);

    const return7d = document.createElement('p');
    return7d.innerHTML = `<strong>Expected average return on investment over prior 7 days: </strong> $${
        Math.floor(coinData[0].percent_change_7d * coinData[0].price / 700)
    }`; // use to track recent changes
    newAsset.appendChild(return7d);

    const change30d = document.createElement('p');
    change30d.innerHTML = `<strong> Percent change in price over the last 30 days: </strong> ${coinData[0].percent_change_30d}%`;
    newAsset.appendChild(change30d);

    const return30d = document.createElement('p');
    return30d.innerHTML = `<strong>Expected average return on investment the last 30 days: </strong> $${
        Math.floor(coinData[0].percent_change_30d * coinData[0].price / 700)
    }`; // use to track recent changes
    newAsset.appendChild(return30d);

    cryptoInfo.appendChild(newAsset);
    //console.log();

};

// Submission 2
const inputTwo = document.getElementById('input-2');
const submitTwo = document.getElementById('submit-2');
const cryptoInfoTwo = document.querySelector('.crypto-info-2');

const clearDivTwo = () => {
    while (cryptoInfoTwo.childNodes.length) {
        cryptoInfoTwo.childNodes[0].remove();
    }
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


