// declare variables 
let currentRecordLeft = document.getElementById("current-record-home");
let teamNameHome = document.getElementById("team-name-home");
let currentRecordRight = document.getElementById("current-record-away");
let teamNameAway = document.getElementById("team-name-away");
let forecastTempHigh = document.getElementById("temp-high");
let forecastTempLow = document.getElementById("temp-low");
let forecastWindSpeed = document.getElementById("wind-speed");
let moneyLineHome = document.getElementById("money-line-home");
let moneyLineAway = document.getElementById("money-line-away");
let homeTeamName = document.getElementById("team-name-home");
let awayTeamName = document.getElementById("team-name-away");
let stadiumName = document.getElementById("stadium-name");
let gameTime = document.getElementById("game-time");
let chosenTeam = document.getElementById('teams')
let logoImgHome = document.getElementById("logo-img-home");
let logoImgAway = document.getElementById("logo-img-away");


// api key
let apiKey = "h5tsn6dz55aesgchyqxtxwq";
let ApiKeyWeather = "218bf9885141b28259c6e95eada68d3c";

const getGameData = async () => {
    const weekApiURL = "https://api.sportsdata.io/v3/nfl/scores/json/UpcomingWeek?key=e77c0acec9484a79a70b9080ee4959b2"


    let response = await fetch(weekApiURL)
    let week = await response.json()


    let gameResponse = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021/${week}?key=e77c0acec9484a79a70b9080ee4959b2`);
    let gameData = await gameResponse.json();


    let recordResponseUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2021REG?key=e77c0acec9484a79a70b9080ee4959b2";
    let recordResponse = await fetch(recordResponseUrl)
    let recordData = await recordResponse.json();

    let teamLogoUrl = "https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=e77c0acec9484a79a70b9080ee4959b2";
    let logoResponse = await fetch(teamLogoUrl)
    let teamLogoData = await logoResponse.json();

    return {
        gameData,recordData,teamLogoData
    }

}

const currentGame = function () {
    getGameData()
        .then(data => {


            data.gameData.filter(function (game) {

                if (game.AwayTeam === chosenTeam.value || game.HomeTeam === chosenTeam.value) {
                    //console.log('game: ', game);
                    data.teamLogoData.filter(function (logos) {
                        if (logos.Key == chosenTeam.value) {
                            console.log(logos.WikipediaLogoUrl);

                            logoImgHome.src = logos.WikipediaLogoUrl;



                        }
                        //console.log(logos);
                        if (logos.Key === game.AwayTeam) {
                            //console.log('game: ', game);
                            //console.log(game.AwayTeam);

                            logoImgAway.src = logos.WikipediaLogoUrl;
                            console.log('logos.WikipediaLogoUrl: ', logos.WikipediaLogoUrl);
                        }


                    })
                    data.recordData.filter(function (record) {
                        //console.log('record: ', record);


                        if (record.Team === chosenTeam.value) {
                            //console.log(record.Losses)
                            //console.log(record.Wins)
                            currentRecordLeft.textContent = "Current Record: " + "(" + record.Wins + "," + record.Losses + ")";
                        }
                         if(record.Team === game.AwayTeam){
                             //console.log(record.Losses)
                             //console.log(record.Wins)
                             currentRecordRight.textContent = "Current Record: " + "(" + record.Wins + "," + record.Losses + ")";
                         }
                    })

                    awayTeamName.textContent = game.AwayTeam;
                    //console.log('game.AwayTeam: ', game.AwayTeam);
                    moneyLineAway.textContent = "ML Odds: " + game.AwayTeamMoneyLine;


                    // run currentWeather() with stadium city
                    currentWeather(game.StadiumDetails.City);
                    //console.log(game.StadiumDetails.City);

                    // run currentNews() with team name 
                    currentNews();


                    // list forecast temp low
                    //forecastTempLow.textContent = game.ForecastTempLow;
                    //list forecast temp high
                    forecastTempHigh.textContent = "Forecasted Temperature high: " + game.ForecastTempHigh + " °F";

                    // list forecast wind speed
                    forecastWindSpeed.textContent = " Forecasted Wind Speed: " + game.ForecastWindSpeed + " Mph";

                    // list home team name
                    homeTeamName.textContent = game.HomeTeam;
                    moneyLineHome.textContent = "ML Odds: " + game.HomeTeamMoneyLine;

                    // list name of stadium, game time
                    stadiumName.textContent = "Location: " + game.StadiumDetails.Name

                }
            })


        })



    currentNews();

};

const currentWeather = function (city) {
    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKeyWeather;

    //make fetch request
    fetch(apiUrlWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // list weather icon, temp, wind speed, chance of rain
                var weatherIcon = data.weather[0].icon;

                var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                let currentWeatherIcon = document.getElementById("icon");
                currentWeatherIcon.innerHTML = "Current Weather:" + "<img src=" + iconUrl + ">";





            });
        }
    })

};

const currentNews = function () {
    var apiUrlWeather = "https://api.sportsdata.io/v3/nfl/scores/json/News?key=e77c0acec9484a79a70b9080ee4959b2";

    //make fetch request
    fetch(apiUrlWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                let newsTitle0El = document.getElementById("news-title0");
                let newsContent0El = document.getElementById("news-content0");
                let newsUrl0Content = document.getElementById("url-content0");

                let newsTitle1El = document.getElementById("news-title1");
                let newsContent1El = document.getElementById("news-content1");
                let newsUrl1Content = document.getElementById("url-content1");

                let newsTitle2El = document.getElementById("news-title2");
                let newsContent2El = document.getElementById("news-content2");
                let newsUrl2Content = document.getElementById("url-content2");
                for (i = 0; i < data.length; i++) {

                    var newsTitle = "Title: " + data[0].Title;
                    //console.log(newsTitle);
                    newsTitle0El.innerHTML = newsTitle;
                    var newsContent = "Content: " + data[0].Content;
                    //console.log(newsContent);
                    newsContent0El.innerHTML = newsContent;
                    var newsUrl = data[0].Url;
                    newsUrl0Content.textContent = "";
                    var urlLink = document.createElement("a");
                    urlLink.setAttribute("href", newsUrl);
                    const urlLinkText0 = newsUrl.slice(newsUrl.length - 75);
                    urlLink.textContent = "Source Url: " + urlLinkText0;
                    newsUrl0Content.appendChild(urlLink);

                    var newsTitle = "Title: " + data[1].Title;
                    //console.log(newsTitle);
                    newsTitle1El.innerHTML = newsTitle;
                    var newsContent = "Content: " + data[1].Content;
                    //console.log(newsContent);
                    newsContent1El.innerHTML = newsContent;
                    var newsUrl = data[1].Url;
                    newsUrl1Content.textContent = "";
                    var urlLink = document.createElement("a");
                    urlLink.setAttribute("href", newsUrl);
                    const urlLinkText1 = newsUrl.slice(newsUrl.length - 75);
                    urlLink.textContent = "Source Url: " + urlLinkText1;
                    newsUrl1Content.appendChild(urlLink);

                    var newsTitle = "Title: " + "<br>" + data[2].Title;
                    //console.log(newsTitle);
                    newsTitle2El.innerHTML = newsTitle;
                    var newsContent = "Content: " + "<br>" + data[2].Content;
                    //console.log(newsContent);
                    newsContent2El.innerHTML = newsContent;
                    var newsUrl = data[2].Url;
                    newsUrl2Content.textContent = "";
                    var urlLink = document.createElement("a");
                    urlLink.setAttribute("href", newsUrl);
                    const urlLinkText2 = newsUrl.slice(newsUrl.length - 75);
                    urlLink.textContent = "Source Url: " + urlLinkText2;
                    newsUrl2Content.appendChild(urlLink);


                }





            });
        }
    })

};



//https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=e77c0acec9484a79a70b9080ee4959b2



chosenTeam.addEventListener('change', currentGame)