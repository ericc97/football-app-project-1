
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
	let cryptoId = input.value
	let APIurl = `https://api.nomics.com/v1/currencies/ticker?key=1c9290f94cc5bd355453afe72dc1fa4d89225b52&ids=${cryptoId}&interval=1d,7d,30d,365d,ytd&convert=USD&per-page=100&page=1`
	
	if (cryptoId) {
		// make a fetch call => function
		getSchedule(APIurl)
	}
	
	input.value = ''
}

function getSchedule(APIurl) {
	fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log('data: ', data);
		let crypto = data[0]
		populateSchedule(schedule)
		let footballSearches = JSON.parse(localStorage.getItem('mySearches'))
		footballSearches.push(crypto.id)
	})
	.catch(err => {
		if (err) alert('bad input')
	})
}