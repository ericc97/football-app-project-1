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
let newsTitleEl = document.getElementById("news-title");
let newsContentEl = document.getElementById("news-content");
let chosenTeam = document.getElementById('teams')
let newsUrlContent = document.getElementById("url-content");

// api key
let apiKey = "h5tsn6dz55aesgchyqxtxwq";
let ApiKeyWeather ="218bf9885141b28259c6e95eada68d3c";

const getGameData = async() => {
    const weekApiURL = "https://api.sportsdata.io/v3/nfl/scores/json/UpcomingWeek?key=e77c0acec9484a79a70b9080ee4959b2"


    let response = await fetch(weekApiURL)
    let week = await response.json()

    
    let gameResponse = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021/${week}?key=e77c0acec9484a79a70b9080ee4959b2`);
    let gameData = await gameResponse.json();
    

    let recordResponseUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2021REG?key=e77c0acec9484a79a70b9080ee4959b2";
    let recordResponse = await fetch(recordResponseUrl)
    let recordData = await recordResponse.json();
    
    return {gameData,recordData};
    
}

const currentGame = function(){
    getGameData()
        .then(data => {
            data.recordData.filter(function(record){
                console.log('record: ', record);

                
                if(record.Team === chosenTeam.value) {
                    console.log(record.Losses)
                    console.log(record.Wins)
                    currentRecordLeft.textContent = " (" + record.Wins + "," + record.Losses + ")";
                }
                // if(record.Team === game.AwayTeam){
                //     console.log(record.Losses)
                //     console.log(record.Wins)
                // }
            })
            data.gameData.filter(function(game) {

                if (game.AwayTeam === chosenTeam.value || game.HomeTeam === chosenTeam.value) {

                    console.log(game)
                    awayTeamName.textContent = game.AwayTeam;
                    console.log('game.AwayTeam: ', game.AwayTeam);
                    moneyLineAway.textContent = game.AwayTeamMoneyLine;


                    // run currentWeather() with stadium city
                    currentWeather(game.StadiumDetails.City);
                    console.log(game.StadiumDetails.City);
                    
                    // run currentNews() with team name 
                    currentNews(game);

                    
                    // list forecast temp low
                    forecastTempLow.textContent = game.ForecastTempLow;
                    //list forecast temp high
                    forecastTempHigh.textContent = game.ForecastTempHigh;
                    
                    // list forecast wind speed
                    forecastWindSpeed.textContent = game.ForecastWindSpeed +" Mph";
                    
                    // list home team name
                    homeTeamName.textContent = game.HomeTeam;
                    moneyLineHome.textContent = game.HomeTeamMoneyLine;
        
                    // list name of stadium, game time
                    stadiumName.textContent = game.StadiumDetails.Name

                }
            })
            

        })

        

        currentNews();

};

const currentWeather = function(city){
    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKeyWeather;

    //make fetch request
    fetch(apiUrlWeather).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                // list weather icon, temp, wind speed, chance of rain
                var weatherIcon = data.weather[0].icon;
                
                var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                let currentWeatherIcon = document.getElementById("icon");
                currentWeatherIcon.innerHTML = "<img src=" + iconUrl + ">";
                
                
                


            });
        }
    })

};

const currentNews = function(){
    var team = chosenTeam.value;
    var apiUrlWeather = "https://api.sportsdata.io/v3/nfl/scores/json/NewsByTeam/" + team + "?key=e77c0acec9484a79a70b9080ee4959b2";

    //make fetch request
    fetch(apiUrlWeather).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                
                //console.log(data);
                var newsTitle = data[0].Title;
                //console.log(newsTitle);
                newsTitleEl.innerHTML = newsTitle;

                var newsContent = data[0].Content;
                //console.log(newsContent);
                newsContentEl.innerHTML = newsContent;

                var newsUrl = data[0].Url;
                

                newsUrlContent.textContent = "";

                var urlLink = document.createElement("a");

                urlLink.setAttribute("href", newsUrl);

                const urlLinkText = newsUrl.slice(newsUrl.length - 75);
                urlLink.textContent = urlLinkText;
                
                


                newsUrlContent.appendChild(urlLink);
                



                

            });
        }
    })

};



//https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=e77c0acec9484a79a70b9080ee4959b2



chosenTeam.addEventListener('change', currentGame)
