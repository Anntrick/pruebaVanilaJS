const userData = {username: "admin", password: "admin"}
const apikey = "f12ba140"
const movies = {}

$(document).ready(() => {
	let user = sessionStorage.getItem('user')
	console.log(window.location.href.toString())

	if(user){
		if(!window.location.href.toString().includes("index.html")){
			window.location = 'index.html'
		}
	}else{
		if(!window.location.href.toString().includes("login.html")){
			window.location = 'login.html'
		}
	}

	$('#search').submit((e) => {
		let searchText = $('#searchText').val()
		getMovies(searchText)
		e.preventDefault()
	})

})


function getMovies(searchText){
	$.getJSON('http://www.omdbapi.com/?apikey=' + apikey + '&s=' + searchText).then(function(response){
		console.log(response)
		let movies = response.Search
		let output = `
					<h2 class="text-center">Resultados de la búsqueda</h2>
						<div class="row">
		`	
		$.each(movies, (index, movie) => {
			let image = (movie.Poster == "N/A")? "https://vignette.wikia.nocookie.net/theflophouse/images/0/0a/No-image-available.png/revision/latest?cb=20140219035154": movie.Poster
			
			let title = (movie.Title.length>60)? movie.Title.substring(0,60)+'...' : movie.Title.substring(0,60)
			output += `
					<div class="col-md-3 moviesCard">
						<div class="text-center">
							<div class="imageContainer"><img class="movieImage" src="${image}"></div>
							<h5>${title}</h5>
							<div class="btn-group" role="group" aria-label="...">
							  <button type="button" onclick="saveMovie('${movie.imdbID}')" class="btn btn-default btnAddFv" id="${movie.imdbID}">Añadir a favoritos</button>
							  <button type="button" onclick="showMovie('${movie.imdbID}')" class="btn btn-default btnMoreInfo">Más Detalles</button>
							</div>
						</div>
					</div>
			`
		})
		output += `</div>`
		$('#movies').html(output)
	})
}

function getFavouritesMovies(){
	let movies = JSON.parse(localStorage.getItem('myMovies'))
	let output = `
				<h2 class="text-center">Favoritos</h2>
					<div class="row">
	`

	$.each(movies, (index, movie) => {
		let image = (movie.Poster == "N/A")? "https://vignette.wikia.nocookie.net/theflophouse/images/0/0a/No-image-available.png/revision/latest?cb=20140219035154": movie.Poster
		
		let title = (movie.Title.length>60)? movie.Title.substring(0,60)+'...' : movie.Title.substring(0,60)
		output += `
			<div class="col-md-3 moviesCard">
				<div class="text-center">
					<div class="imageContainer"><img class="movieImage" src="${image}"></div>
					<h5>${title}</h5>
					<div class="btn-group" role="group" aria-label="...">
					  	<button type="button" onclick="showMovie('${movie.imdbID}')" class="btn btn-default btnMoreInfo">Más Detalles</button>
					</div>
				</div>
			</div>
		`
	})
	output += `</div>`
	$('#movies').html(output)
}

function showMovie(id){
	$.getJSON('http://www.omdbapi.com/?apikey=' + apikey + '&i=' + id).then(function(response){
		$('#movieDetails .modal-title').html(response.Title)
		let image = (response.Poster == "N/A")? "https://vignette.wikia.nocookie.net/theflophouse/images/0/0a/No-image-available.png/revision/latest?cb=20140219035154": response.Poster

		let modalContent = `
			<img class="movieDetailsImage" src="${image}">
			<p><b>Año:</b> ${response.Year}</p>
			<p><b>Productor:</b> ${response.Production}</p>
			<p><b>Duración:</b> ${response.Runtime}</p>
			<p><b>Sinopsis:</b> ${response.Plot}</p>
		`

		$('#movieDetails .modal-body').html(modalContent)
		$('#movieDetails').modal('show')
	})
}

function saveMovie(id){
	let favMovies = localStorage.getItem('myMovies')
	if(favMovies && favMovies != 'null'){
		favMovies = JSON.parse(favMovies)
	}else{
		favMovies = []
	}

	$.getJSON('http://www.omdbapi.com/?apikey=' + apikey + '&i=' + id).then(function(response){
		favMovies.push(response)
		console.log(response)
		favMovies = JSON.stringify(favMovies)
		console.log(favMovies)
		localStorage.setItem('myMovies', favMovies)
	})
}

function login(){
	let user = $('#inputUser').val()
	let password = $('#inputPassword').val()
	
	if(user == userData['username']){
		if(password == userData['password']){
			sessionStorage.setItem('user', userData['username'])
			window.location = 'index.html'
		}else{
			alert("La contraseña no es correcta")
		}
	}else{
		alert("El usuario no es correcto")
	}
}

function logout(){
	if(sessionStorage.getItem('user')){
		sessionStorage.removeItem('user')
		window.location = 'login.html'
	}
}