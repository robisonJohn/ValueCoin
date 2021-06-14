/*
LUNAR CRUSH API
*/
// so how should we proceed?
// first, fetch the data from the url. 
// second, convert the useful data into variables.
// third, assign these variable values to components of the HTML document.
// const BASE_URL = 'https://api.lunarcrush.com/v2?data=assets&key=gwdbw0jz0hfr6fveqfmg2r&symbol=BTC';
//console.log(sampleUrl);
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

    let meanPrice = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        meanPrice = meanPrice + timeSeries[i].close;
    }
    meanPrice = meanPrice / timeSeries.length;
    //console.log(meanPrice);

    let earnings = timeSeries[timeSeries.length - 1].close - timeSeries[0].close;

    let peRatio = meanPrice / earnings;

    let volatility = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        volatility = volatility + Math.pow((meanPrice - timeSeries[i].close), 2);
    }
    console.log(`The volatility is ${volatility}`);
    let variance = Math.sqrt(volatility);
    console.log(`The variance is ${variance}`);
    variance = variance / timeSeries.length;
    console.log(`The variance is ${variance}`);
    console.log(timeSeries.length)
    
    //console.log(variance);

    let downside = 0;
    let counter = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        if (meanPrice - timeSeries[i].close > 0) {
            downside = downside + Math.pow((meanPrice - timeSeries[i].close),2);
            counter = counter + 1;
        }
    }
    console.log(`The counter is at ${counter}`);
    console.log(`The downside is ${downside}`);
    let downsideRisk = Math.sqrt(downside);
    console.log(`The downside risk is ${downsideRisk}`);
    downsideRisk = downsideRisk / counter;
    console.log(`The downside risk is ${downsideRisk}`);
    //console.log(downsideRisk);

    let upside = 0;
    let counterUp = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        if (meanPrice - timeSeries[i].close < 0) {
            upside = upside + Math.pow((meanPrice - timeSeries[i].close),2);
            counterUp = counterUp + 1;
        }
    }
    console.log(`The upside is ${upside}`);
    let upsideRisk = Math.sqrt(upside);
    console.log(`The upside risk is ${upsideRisk}`)
    upsideRisk = upsideRisk / counterUp;
    console.log(`The upside risk is ${upsideRisk}`)
    console.log(`counterUp is ${counterUp}`);
    //console.log(upsideRisk);

    const riskDifferential = upsideRisk - downsideRisk;
    console.log(riskDifferential);

    /* CORE ASSET VALUES */
    // note: we will round all values to four sig figs
    const newAsset = document.createElement('div');
    newAsset.className = 'new-asset';

    const name = document.createElement('p');
    name.innerHTML = `<strong>Asset name: </strong>${coinData[0].name}`.toUpperCase();
    newAsset.appendChild(name);

    const symbol = document.createElement('p');
    symbol.innerHTML = `<strong>Asset symbol: </strong>${coinData[0].symbol}`.toUpperCase();
    newAsset.appendChild(symbol);

    const price = document.createElement('p');
    price.innerHTML = `<strong>Current asset price: </strong>$${(coinData[0].price).toPrecision(3)}`.toUpperCase();
    newAsset.appendChild(price);

    /* VELOCITY AND ITS CHILD VARIABLES */

    const velocity = document.createElement('p');
    velocity.innerHTML = `<strong>Velocity: </strong>${
        (coinData[0].volume_24h * Math.pow(coinData[0].price, 2) / coinData[0].market_cap_global).toPrecision(3)
    }`.toUpperCase()
    newAsset.appendChild(velocity);

    const velocityChildren = document.createElement('ul');

    const marketCap = document.createElement('li');
    marketCap.innerHTML = `<strong>Current asset market capitalization, in USD: </strong>$${(coinData[0].market_cap_global).toPrecision(3)}`.toUpperCase();
    velocityChildren.appendChild(marketCap);

    const volume = document.createElement('li');
    volume.innerHTML = `<strong>Transaction volume over prior 24 hours, in USD: </strong>$${(coinData[0].volume_24h).toPrecision(3)}`.toUpperCase(); // volume in USD for 24 hours up to this data point
    velocityChildren.appendChild(volume);

    newAsset.appendChild(velocityChildren);

    /* PRICE TO EARNINGS VARIABLE AND ITS CHILD VARIABLES*/
    // five sub-metrics: mean price, mean earnings, percent earned, high, low

    let pe = document.createElement('p');
    pe.innerHTML = `<strong>Price to Earnings Ratio: </strong>${peRatio.toPrecision(3)}`.toUpperCase();
    newAsset.appendChild(pe);

    let peChildren = document.createElement('ul');

    const mean = document.createElement('li');
    mean.innerHTML = `<strong>Mean Price </strong>: $${meanPrice.toPrecision(3)}`.toUpperCase();
    peChildren.appendChild(mean);

    const averageEarnings = document.createElement('li');
    averageEarnings.innerHTML = `<strong>Mean Earnings: </strong> ${earnings.toPrecision(3)}`.toUpperCase();
    peChildren.appendChild(averageEarnings);

    const percentEarned = document.createElement('li');
    percentEarned.innerHTML = `<strong>Percent Earned:</strong> ${(100 * earnings / timeSeries[timeSeries.length - 1].close).toPrecision(3)}%`.toUpperCase();
    peChildren.appendChild(percentEarned);

    newAsset.appendChild(peChildren);

    /*
    RISK DIFFERENTIAL AND ITS CHILDREN COMPONENTS
    */
   const riskDifferentialTag = document.createElement('p');
   riskDifferentialTag.innerHTML = `<strong>Risk differential: </strong>${riskDifferential.toPrecision(3)}`.toUpperCase();
   newAsset.appendChild(riskDifferentialTag);

   const riskTagList = document.createElement('ul');

   const varianceTag = document.createElement('li');
   varianceTag.innerHTML = `<strong>Variance: </strong>${variance.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(varianceTag);

   const downsideTag = document.createElement('li');
   downsideTag.innerHTML = `<strong>Downside Risk: </strong>${downsideRisk.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(downsideTag);

   const upsideTag = document.createElement('li');
   upsideTag.innerHTML = `<strong>Upside Risk: </strong>${upsideRisk.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(upsideTag);

   newAsset.appendChild(riskTagList);

    cryptoInfo.appendChild(newAsset);
    //console.log();

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

    let meanPrice = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        meanPrice = meanPrice + timeSeries[i].close;
    }
    meanPrice = meanPrice / timeSeries.length;
    //console.log(meanPrice);

    let earnings = timeSeries[timeSeries.length - 1].close - timeSeries[0].close;

    let peRatio = meanPrice / earnings;

    let volatility = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        volatility = volatility + Math.pow((meanPrice - timeSeries[i].close), 2);
    }
    console.log(`The volatility is ${volatility}`);
    let variance = Math.sqrt(volatility);
    console.log(`The variance is ${variance}`);
    variance = variance / timeSeries.length;
    console.log(`The variance is ${variance}`);
    console.log(timeSeries.length)
    
    //console.log(variance);

    let downside = 0;
    let counter = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        if (meanPrice - timeSeries[i].close > 0) {
            downside = downside + Math.pow((meanPrice - timeSeries[i].close),2);
            counter = counter + 1;
        }
    }
    console.log(`The counter is at ${counter}`);
    console.log(`The downside is ${downside}`);
    let downsideRisk = Math.sqrt(downside);
    console.log(`The downside risk is ${downsideRisk}`);
    downsideRisk = downsideRisk / counter;
    console.log(`The downside risk is ${downsideRisk}`);
    //console.log(downsideRisk);

    let upside = 0;
    let counterUp = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        if (meanPrice - timeSeries[i].close < 0) {
            upside = upside + Math.pow((meanPrice - timeSeries[i].close),2);
            counterUp = counterUp + 1;
        }
    }
    console.log(`The upside is ${upside}`);
    let upsideRisk = Math.sqrt(upside);
    console.log(`The upside risk is ${upsideRisk}`)
    upsideRisk = upsideRisk / counterUp;
    console.log(`The upside risk is ${upsideRisk}`)
    console.log(`counterUp is ${counterUp}`);
    //console.log(upsideRisk);

    const riskDifferential = upsideRisk - downsideRisk;
    console.log(riskDifferential);

    /* CORE ASSET VALUES */
    // note: we will round all values to four sig figs
    const newAssetTwo = document.createElement('div');
    newAssetTwo.className = 'new-asset-2';

    const name = document.createElement('p');
    name.innerHTML = `<strong>Asset name: </strong>${coinData[0].name}`.toUpperCase();
    newAssetTwo.appendChild(name);

    const symbol = document.createElement('p');
    symbol.innerHTML = `<strong>Asset symbol: </strong>${coinData[0].symbol}`.toUpperCase();
    newAssetTwo.appendChild(symbol);

    const price = document.createElement('p');
    price.innerHTML = `<strong>Current asset price: </strong>$${(coinData[0].price).toPrecision(3)}`.toUpperCase();
    newAssetTwo.appendChild(price);

    /* VELOCITY AND ITS CHILD VARIABLES */

    const velocity = document.createElement('p');
    velocity.innerHTML = `<strong>Velocity: </strong>${
        (coinData[0].volume_24h * Math.pow(coinData[0].price, 2) / coinData[0].market_cap_global).toPrecision(3)
    }`.toUpperCase()
    newAssetTwo.appendChild(velocity);

    const velocityChildren = document.createElement('ul');

    const marketCap = document.createElement('li');
    marketCap.innerHTML = `<strong>Current asset market capitalization, in USD: </strong>$${(coinData[0].market_cap_global).toPrecision(3)}`.toUpperCase();
    velocityChildren.appendChild(marketCap);

    const volume = document.createElement('li');
    volume.innerHTML = `<strong>Transaction volume over prior 24 hours, in USD: </strong>$${(coinData[0].volume_24h).toPrecision(3)}`.toUpperCase(); // volume in USD for 24 hours up to this data point
    velocityChildren.appendChild(volume);

    newAssetTwo.appendChild(velocityChildren);

    /* PRICE TO EARNINGS VARIABLE AND ITS CHILD VARIABLES*/
    // five sub-metrics: mean price, mean earnings, percent earned, high, low

    let pe = document.createElement('p');
    pe.innerHTML = `<strong>Price to Earnings Ratio: </strong>${peRatio.toPrecision(3)}`.toUpperCase();
    newAssetTwo.appendChild(pe);

    let peChildren = document.createElement('ul');

    const mean = document.createElement('li');
    mean.innerHTML = `<strong>Mean Price </strong>: $${meanPrice.toPrecision(3)}`.toUpperCase();
    peChildren.appendChild(mean);

    const averageEarnings = document.createElement('li');
    averageEarnings.innerHTML = `<strong>Mean Earnings: </strong> ${earnings.toPrecision(3)}`.toUpperCase();
    peChildren.appendChild(averageEarnings);

    const percentEarned = document.createElement('li');
    percentEarned.innerHTML = `<strong>Percent Earned:</strong> ${(100 * earnings / timeSeries[timeSeries.length - 1].close).toPrecision(3)}%`.toUpperCase();
    peChildren.appendChild(percentEarned);

    newAssetTwo.appendChild(peChildren);

    /*
    RISK DIFFERENTIAL AND ITS CHILDREN COMPONENTS
    */
   const riskDifferentialTag = document.createElement('p');
   riskDifferentialTag.innerHTML = `<strong>Risk differential: </strong>${riskDifferential.toPrecision(3)}`.toUpperCase();
   newAssetTwo.appendChild(riskDifferentialTag);

   const riskTagList = document.createElement('ul');

   const varianceTag = document.createElement('li');
   varianceTag.innerHTML = `<strong>Variance: </strong>${variance.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(varianceTag);

   const downsideTag = document.createElement('li');
   downsideTag.innerHTML = `<strong>Downside Risk: </strong>${downsideRisk.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(downsideTag);

   const upsideTag = document.createElement('li');
   upsideTag.innerHTML = `<strong>Upside Risk: </strong>${upsideRisk.toPrecision(3)}`.toUpperCase();
   riskTagList.appendChild(upsideTag);

   newAssetTwo.appendChild(riskTagList);

    cryptoInfoTwo.appendChild(newAssetTwo);
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


