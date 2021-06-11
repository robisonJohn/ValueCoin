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

     /*
    We need to calculate the following metrics:
    1. Volume
    Main: Social Score
    1. Average Tweet Sentiment Impact 1 (Very bearish)
    2. Average Tweet Sentiment Impact 2 (Bearish)
    3. Average Tweet Sentiment Impact 3 (Neutral)
    4. Average Tweet Sentiment Impact 4 (Bullish)
    5. Average Tweet Sentiment Impact 5 (Very Bullish)
    6. Average URL shares
    7. Average Reddit Post Score
    8. Average Reddit Comment Score
    */
   let totalSocialVolume = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        totalSocialVolume = totalSocialVolume + timeSeries[i].social_volume;
    }

    let tweetImpactOne = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactOne = tweetImpactOne + timeSeries[i].tweet_sentiment_impact1;
    }
    tweetmpactOne = tweetImpactOne / timeSeries.length;

    let tweetImpactTwo = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactTwo = tweetImpactTwo + timeSeries[i].tweet_sentiment_impact2;
    }
    tweetmpactTwo = tweetImpactTwo / timeSeries.length;

    let tweetImpactThree = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactThree = tweetImpactThree + timeSeries[i].tweet_sentiment_impact3;
    }
    tweetmpactThree = tweetImpactThree / timeSeries.length;

    let tweetImpactFour = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactFour = tweetImpactFour + timeSeries[i].tweet_sentiment_impact4;
    }
    tweetmpactFour = tweetImpactFour / timeSeries.length;

    let tweetImpactFive = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactFive = tweetImpactFive + timeSeries[i].tweet_sentiment_impact5;
    }
    tweetmpactFive = tweetImpactFive / timeSeries.length;

    let redditPosts = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        redditPosts = redditPosts + timeSeries[i].reddit_posts_score;
    }
    redditPosts = redditPosts / timeSeries.length;

    let redditComments = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        redditComments = redditComments + timeSeries[i].reddit_comments_score;
    }
    redditComments = redditComments / timeSeries.length;

    let urlShares = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        urlShares = urlShares + timeSeries[i].url_shares;
    }
    urlShares = urlShares / timeSeries.length;

   
    //let avgSocialVolume = totalSocialVolume / timeSeries.length;

    const volume = document.createElement('p');
    volume.innerHTML = `<strong>Average Volume of Social Media Posts: </strong> ${totalSocialVolume}`;
    newAsset.appendChild(volume);

    const volumeChildren = document.createElement('ul');

    const tweetImpactOneChild = document.createElement('li');
    tweetImpactOneChild.innerHTML = `<strong>Average of Very Bearish Tweets + Reactions: </strong>${tweetImpactOne}`;
    volumeChildren.appendChild(tweetImpactOneChild);

    const tweetImpactTwoChild = document.createElement('li');
    tweetImpactTwoChild.innerHTML = `<strong>Average of Bearish Tweets + Reactions: </strong>${tweetImpactTwo}`;
    volumeChildren.appendChild(tweetImpactTwoChild);

    const tweetImpactThreeChild = document.createElement('li');
    tweetImpactThreeChild.innerHTML = `<strong>Average of of Neutral Tweets + Reactions: </strong>${tweetImpactThree}`;
    volumeChildren.appendChild(tweetImpactThreeChild);

    const tweetImpactFourChild = document.createElement('li');
    tweetImpactFourChild.innerHTML = `<strong>Average of of Bullish Tweets + Reactions: </strong>${tweetImpactFour}`;
    volumeChildren.appendChild(tweetImpactFourChild);

    const tweetImpactFiveChild = document.createElement('li');
    tweetImpactFiveChild.innerHTML = `<strong>Average of Very Bearish Tweets + Reactions: </strong>${tweetImpactFive}`;
    volumeChildren.appendChild(tweetImpactOneChild);

    const redditPostChild = document.createElement('li');
    redditPostChild.innerHTML = `<strong>Average of Reddit Posts + Reactions: </strong>${redditPosts}`;
    volumeChildren.appendChild(redditPostChild);

    const redditCommentChild = document.createElement('li');
    redditCommentChild.innerHTML = `<strong>Average of Reddit Comments + Reactions: </strong>${redditComments}`;
    volumeChildren.appendChild(redditCommentChild);

    const urlShareChild = document.createElement('li');
    urlShareChild.innerHTML = `<strong>Average of Url Shares: </strong>${urlShares}`;
    volumeChildren.appendChild(urlShareChild);

    newAsset.appendChild(volumeChildren);


    /*
    2. Sentiment
    Main: Average Sentiment
    1. Absolute Sentiment: Percent of bullish or very bullish tweets
    2. Relative Sentiment: % of tweets that are bullish, excluding neutral tweets
    */

    let avgSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        avgSentiment = avgSentiment + timeSeries[i].average_sentiment;
    }
    avgSentiment = avgSentiment / timeSeries.length;

    let absSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        absSentiment = absSentiment + timeSeries[i].sentiment_absolute;
    }
    absSentiment = absSentiment / timeSeries.length;

    let relSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        relSentiment = relSentiment + timeSeries[i].sentiment_relative;
    }
    relSentiment = relSentiment / timeSeries.length;



    const sentiment = document.createElement('p');
    sentiment.innerHTML = `<strong>Average Sentiment: </strong>${avgSentiment.toPrecision(3)}`;
    newAsset.appendChild(sentiment);

    const sentimentChildren = document.createElement('ul');

    const relativeSentiment = document.createElement('li');
    relativeSentiment.innerHTML = `<strong>Relative Sentiment: </strong> ${relSentiment.toPrecision(3)}%`;
    sentimentChildren.appendChild(relativeSentiment);

    const absoluteSentiment = document.createElement('li');
    absoluteSentiment.innerHTML = `<strong>Absolute Sentiment: </strong> ${absSentiment.toPrecision(3)}%`;
    sentimentChildren.appendChild(absoluteSentiment);

    newAsset.appendChild(sentimentChildren);

     /*
    3. Correlation
    Main: Galaxy Score --> score based on how technical indicators of price, average social sentiment, relative social activity, 
    and a factor of how closely social indicators correlate with price and volume
    1. Correlation Rank --> score based on how social metrics correlate with price and volume
    2. Market Dominance
    3. Social Dominance
    */ 

    let galaxyScore = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        galaxyScore = galaxyScore + timeSeries[i].galaxy_score;
    }
    galaxyScore = galaxyScore / timeSeries.length;


    let correlationScore = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        correlationScore += timeSeries[i].correlation_rank;
    }
    correlationScore = correlationScore / timeSeries.length;

    let marketDominance = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        marketDominance += timeSeries[i].market_dominance;
    }
    marketDominance = marketDominance / timeSeries.length;

    let socialDominance = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        socialDominance += timeSeries[i].social_dominance;
    }
    socialDominance = socialDominance / timeSeries.length;

    const galaxy = document.createElement('p');
    galaxy.innerHTML = `<strong>Galaxy Score: </strong>`;
    newAsset.appendChild(galaxy);

    const correlationChildren = document.createElement('ul');

    const corrScore = document.createElement('li');
    corrScore.innerHTML = `<strong>Correlation Rank: </strong> ${correlationScore.toPrecision(3)}`;
    correlationChildren.appendChild(corrScore);

    const marketDom = document.createElement('li');
    marketDom.innerHTML = `<strong>Market Dominance: </strong> ${marketDominance.toPrecision(3)}`
    correlationChildren.appendChild(marketDom);

    const socialDom = document.createElement('li');
    socialDom.innerHTML = `<strong>Social Dominance: </strong> ${socialDominance.toPrecision(3)}`
    correlationChildren.appendChild(socialDom);

    newAsset.append(correlationChildren);

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
    console.log(timeSeries);
    
    const newAssetTwo = document.createElement('div');
    newAssetTwo.className = 'new-asset-2';

     /*
    We need to calculate the following metrics:
    1. Volume
    Main: Social Score
    1. Average Tweet Sentiment Impact 1 (Very bearish)
    2. Average Tweet Sentiment Impact 2 (Bearish)
    3. Average Tweet Sentiment Impact 3 (Neutral)
    4. Average Tweet Sentiment Impact 4 (Bullish)
    5. Average Tweet Sentiment Impact 5 (Very Bullish)
    6. Average URL shares
    7. Average Reddit Post Score
    8. Average Reddit Comment Score
    */
   let totalSocialVolume = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        totalSocialVolume = totalSocialVolume + timeSeries[i].social_volume;
    }

    let tweetImpactOne = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactOne = tweetImpactOne + timeSeries[i].tweet_sentiment_impact1;
    }
    tweetmpactOne = tweetImpactOne / timeSeries.length;

    let tweetImpactTwo = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactTwo = tweetImpactTwo + timeSeries[i].tweet_sentiment_impact2;
    }
    tweetmpactTwo = tweetImpactTwo / timeSeries.length;

    let tweetImpactThree = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactThree = tweetImpactThree + timeSeries[i].tweet_sentiment_impact3;
    }
    tweetmpactThree = tweetImpactThree / timeSeries.length;

    let tweetImpactFour = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactFour = tweetImpactFour + timeSeries[i].tweet_sentiment_impact4;
    }
    tweetmpactFour = tweetImpactFour / timeSeries.length;

    let tweetImpactFive = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        tweetImpactFive = tweetImpactFive + timeSeries[i].tweet_sentiment_impact5;
    }
    tweetmpactFive = tweetImpactFive / timeSeries.length;

    let redditPosts = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        redditPosts = redditPosts + timeSeries[i].reddit_posts_score;
    }
    redditPosts = redditPosts / timeSeries.length;

    let redditComments = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        redditComments = redditComments + timeSeries[i].reddit_comments_score;
    }
    redditComments = redditComments / timeSeries.length;

    let urlShares = 0;

    for (let i = 0; i < timeSeries.length; i++) {
        urlShares = urlShares + timeSeries[i].url_shares;
    }
    urlShares = urlShares / timeSeries.length;

   
    //let avgSocialVolume = totalSocialVolume / timeSeries.length;

    const volume = document.createElement('p');
    volume.innerHTML = `<strong>Average Volume of Social Media Posts: </strong> ${totalSocialVolume}`;
    newAssetTwo.appendChild(volume);

    const volumeChildren = document.createElement('ul');

    const tweetImpactOneChild = document.createElement('li');
    tweetImpactOneChild.innerHTML = `<strong>Average of Very Bearish Tweets + Reactions: </strong>${tweetImpactOne}`;
    volumeChildren.appendChild(tweetImpactOneChild);

    const tweetImpactTwoChild = document.createElement('li');
    tweetImpactTwoChild.innerHTML = `<strong>Average of Bearish Tweets + Reactions: </strong>${tweetImpactTwo}`;
    volumeChildren.appendChild(tweetImpactTwoChild);

    const tweetImpactThreeChild = document.createElement('li');
    tweetImpactThreeChild.innerHTML = `<strong>Average of of Neutral Tweets + Reactions: </strong>${tweetImpactThree}`;
    volumeChildren.appendChild(tweetImpactThreeChild);

    const tweetImpactFourChild = document.createElement('li');
    tweetImpactFourChild.innerHTML = `<strong>Average of of Bullish Tweets + Reactions: </strong>${tweetImpactFour}`;
    volumeChildren.appendChild(tweetImpactFourChild);

    const tweetImpactFiveChild = document.createElement('li');
    tweetImpactFiveChild.innerHTML = `<strong>Average of Very Bearish Tweets + Reactions: </strong>${tweetImpactFive}`;
    volumeChildren.appendChild(tweetImpactOneChild);

    const redditPostChild = document.createElement('li');
    redditPostChild.innerHTML = `<strong>Average of Reddit Posts + Reactions: </strong>${redditPosts}`;
    volumeChildren.appendChild(redditPostChild);

    const redditCommentChild = document.createElement('li');
    redditCommentChild.innerHTML = `<strong>Average of Reddit Comments + Reactions: </strong>${redditComments}`;
    volumeChildren.appendChild(redditCommentChild);

    const urlShareChild = document.createElement('li');
    urlShareChild.innerHTML = `<strong>Average of Url Shares: </strong>${urlShares}`;
    volumeChildren.appendChild(urlShareChild);

    newAssetTwo.appendChild(volumeChildren);


    /*
    2. Sentiment
    Main: Average Sentiment
    1. Absolute Sentiment: Percent of bullish or very bullish tweets
    2. Relative Sentiment: % of tweets that are bullish, excluding neutral tweets
    */

    let avgSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        avgSentiment = avgSentiment + timeSeries[i].average_sentiment;
    }
    avgSentiment = avgSentiment / timeSeries.length;

    let absSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        absSentiment = absSentiment + timeSeries[i].sentiment_absolute;
    }
    absSentiment = absSentiment / timeSeries.length;

    let relSentiment = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        relSentiment = relSentiment + timeSeries[i].sentiment_relative;
    }
    relSentiment = relSentiment / timeSeries.length;



    const sentiment = document.createElement('p');
    sentiment.innerHTML = `<strong>Average Sentiment: </strong>${avgSentiment.toPrecision(3)}`;
    newAssetTwo.appendChild(sentiment);

    const sentimentChildren = document.createElement('ul');

    const relativeSentiment = document.createElement('li');
    relativeSentiment.innerHTML = `<strong>Relative Sentiment: </strong> ${relSentiment.toPrecision(3)}%`;
    sentimentChildren.appendChild(relativeSentiment);

    const absoluteSentiment = document.createElement('li');
    absoluteSentiment.innerHTML = `<strong>Absolute Sentiment: </strong> ${absSentiment.toPrecision(3)}%`;
    sentimentChildren.appendChild(absoluteSentiment);

    newAssetTwo.appendChild(sentimentChildren);

     /*
    3. Correlation
    Main: Galaxy Score --> score based on how technical indicators of price, average social sentiment, relative social activity, 
    and a factor of how closely social indicators correlate with price and volume
    1. Correlation Rank --> score based on how social metrics correlate with price and volume
    2. Market Dominance
    3. Social Dominance
    */ 

    let galaxyScore = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        galaxyScore = galaxyScore + timeSeries[i].galaxy_score;
    }
    galaxyScore = galaxyScore / timeSeries.length;


    let correlationScore = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        correlationScore += timeSeries[i].correlation_rank;
    }
    correlationScore = correlationScore / timeSeries.length;

    let marketDominance = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        marketDominance += timeSeries[i].market_dominance;
    }
    marketDominance = marketDominance / timeSeries.length;

    let socialDominance = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        socialDominance += timeSeries[i].social_dominance;
    }
    socialDominance = socialDominance / timeSeries.length;

    const galaxy = document.createElement('p');
    galaxy.innerHTML = `<strong>Galaxy Score: </strong>`;
    newAssetTwo.appendChild(galaxy);

    const correlationChildren = document.createElement('ul');

    const corrScore = document.createElement('li');
    corrScore.innerHTML = `<strong>Correlation Rank: </strong> ${correlationScore.toPrecision(3)}`;
    correlationChildren.appendChild(corrScore);

    const marketDom = document.createElement('li');
    marketDom.innerHTML = `<strong>Market Dominance: </strong> ${marketDominance.toPrecision(3)}`
    correlationChildren.appendChild(marketDom);

    const socialDom = document.createElement('li');
    socialDom.innerHTML = `<strong>Social Dominance: </strong> ${socialDominance.toPrecision(3)}`
    correlationChildren.appendChild(socialDom);

    newAssetTwo.append(correlationChildren);

    cryptoInfoTwo.appendChild(newAssetTwo);



    

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


