/*
LUNAR CRUSH API

The goal for this API is to serve a similar role to the prior page, except this time our goal is to pull social data.
*/
const BASE_URL = 'https://api.lunarcrush.com/v2?data=assets&key=gwdbw0jz0hfr6fveqfmg2r';

// Submission One
const symbol = document.getElementById('input');
const time = document.getElementById('time');
const dataPoints = document.getElementById('data');
const submit = document.getElementById('submit');
const cryptoInfo = document.querySelector('.crypto-info');

const clearDiv = () => {
    while (cryptoInfo.childNodes.length) {
        cryptoInfo.childNodes[0].remove();
    }
};

submit.addEventListener("click", () => {

    const sampleUrl = `${BASE_URL}&symbol=${symbol.value}&data_points=${dataPoints.value}&interval=${time.value}`;
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
    const timeSeries = coinData[0].timeSeries;
    console.log(timeSeries);

    const newAsset = document.createElement('div');
    newAsset.className = 'new-asset';

    const volume = document.createElement('p');
    volume.innerHTML = `<strong>Volume of Social Media Posts: </strong>`;
    newAsset.appendChild(volume);

    const volumeChildren = document.createElement('ul');

    const sentiment = document.createElement('p');
    sentiment.innerHTML = `<strong>Average Sentiment: </strong>`;
    newAsset.appendChild(sentiment);

    const sentimentChildren = document.createElement('ul');

    const correlation = document.createElement('p');
    correlation.innerHTML = `<strong>Correlation between Social Media and Asset Price / Volume: </strong>`;
    newAsset.appendChild(correlation);
    const correlationChildren = document.createElement('ul');

    cryptoInfo.appendChild(newAsset);





    

};

// Submission 2
const symbolTwo = document.getElementById('input-2');
const timeTwo = document.getElementById('time-2');
const dataPointsTwo = document.getElementById('data-2');
const submitTwo = document.getElementById('submit-2');
const cryptoInfoTwo = document.querySelector('.crypto-info-2');

const clearDivTwo = () => {
    while (cryptoInfoTwo.childNodes.length) {
        cryptoInfoTwo.childNodes[0].remove();
    }
};
submitTwo.addEventListener("click", () => {
    const sampleUrlTwo = `${BASE_URL}&symbol=${symbolTwo.value}&data_points=${dataPointsTwo.value}&interval=${timeTwo.value}`;
    searchLunarCrushTwo(sampleUrlTwo);

});


const searchLunarCrushTwo = async (url) => {
    try {
        let response = await axios.get(url);
        
        const data = response.data;
        clearDivTwo();
        processDataTwo(data);
    } catch (error) {
        console.error(error.message);
    }
};

const processDataTwo = (sampleData) => {
    const coinData = sampleData.data;
    const timeSeries = coinData[0].timeSeries;

    

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


