let dropDownEl = document.getElementById("teams")
// This code sets the searches to local storage if there is nothing present. 
let footballSearches = localStorage.getItem("mySearches")
                                ? JSON.parse(localStorage.getItem("mySearches"))
                                : localStorage.setItem("mySearches", JSON.stringify([]))


// add this section to a 'populate' function. This section grabs from local storage
let footballSearches = JSON.parse(localStorage.getItem('mySearches'))
// this pushes the api data to the local storage array defined as 'searches'
    searches.push(crypto.id)

function populateSchedule(games) {

}

function handleSearch() {
	let dropDownIdEl = dropDownEl.value
	let APIurl = `https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=e77c0acec9484a79a70b9080ee4959b2`
	
		// make a fetch call => function
		getSchedule(APIurl)
}

function getSchedule(APIurl) {
	fetch(APIurl)
	.then(response => response.json())
	.then(schedule => {
		console.log(schedule);
		
		populateSchedule(schedule)

	})
	.catch(err => {
		if (err) alert("Error: " + response.statusText)
	})
}

dropDownEl.addEventListener("change", handleSearch)