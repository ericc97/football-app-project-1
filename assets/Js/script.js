let chosenTeam = document.getElementById('teams')
let HomeEl = document.getElementById("home")
let AwayEl = document.getElementById("away")


// // This code sets the searches to local storage if there is nothing present. 
// let footballSearches = localStorage.getItem("mySearches")
//                                 ? JSON.parse(localStorage.getItem("mySearches"))
//                                 : localStorage.setItem("mySearches", JSON.stringify([]))


// // add this section to a 'populate' function. This section grabs from local storage
// let footballSearches = JSON.parse(localStorage.getItem('mySearches'))
// // this pushes the api data to the local storage array defined as 'searches'
//     searches.push()

function populateHomeSchedule(games) {

        let HomeItem = document.createElement('p');
            HomeItem.textContent = schedule.value;
            HomeEl.appendChild(HomeItem);
}

// function populateAwaySchedule(games) {

//     let HomeItem = document.createElement('p');
//         HomeItem.textContent = schedule.value;
//         HomeEl.appendChild(HomeItem);
// }
// // wins and losses function
// function handleSearch() {
// 	let dropDownIdEl = dropDownEl.value
// 	let APIurl = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2021REG?key=e77c0acec9484a79a70b9080ee4959b2`
	
// 		// make a fetch call => function
// 		getSchedule(APIurl)
// }

const getGameData1 = async() => {
    const scheduleApiURL = "https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=e77c0acec9484a79a70b9080ee4959b2"
    let response = await fetch(scheduleApiURL)
    let schedule = await response.json()

    let standingsResponseUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Standings/2021REG?key=e77c0acec9484a79a70b9080ee4959b2";
    let standingsResponse = await fetch(standingsResponseUrl)
    let standingsData = await standingsResponse.json();
    return {schedule,standingsData};
}
const gameInfo = function() {
    getGameData1()
        .then(data => {
            let addedElements = document.querySelectorAll(".added")
            if (addedElements) {
                addedElements.forEach(element => {
                element.remove()
            });
            }
        data.schedule.filter(function(game) {
            if (game.AwayTeam === chosenTeam.value || game.HomeTeam === chosenTeam.value) {
                console.log(game)
                console.log(game.AwayTeam)
                console.log(game.HomeTeam.name)
                let HomeItem = document.createElement('p');
                HomeItem.classList.add("added")
                HomeItem.textContent = game.HomeTeam;
                HomeEl.appendChild(HomeItem);
                

                let AwayItem = document.createElement('p');
                AwayItem.classList.add("added")
                AwayItem.textContent = game.AwayTeam;
                AwayEl.appendChild(AwayItem);

                
            }
           })
      
})   



}

// add searched team Key to saved list
// convert this to Vanilla Javascript 
// var addToList = function(c){
//     var listEl = $("<li >" + c.toUpperCase() + "</li>");
//     $(listEl).attr("class", "list-group-item");
//     $(listEl).attr("data-value", c.toUpperCase());

//     $(".list-group").append(listEl);
//     console.log(c);
// }

// when clear search history is clicked removed listed cities
// var clearSearchBtn = function(event){
//     event.preventDefault();
//     sCity = [];
//     // change this tpo work with team Key value
//     localStorage.removeItem("cityname");
//     document.location.reload();
// }

chosenTeam.addEventListener('change', gameInfo)
