const userData = {username: "admin", password: "admin"};
const apikey = "f12ba140";
const movies = {};

$(document).ready(() => {

	$('#search').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});


function getMovies(searchText){
	$.getJSON('http://www.omdbapi.com/?apikey=' + apikey + '&s=' + searchText).then(function(response){
		console.log(response);
		let movies = response.Search;
		let output = "";

		$.each(movies, (index, movie) => {
			let image = (movie.Poster == "N/A")? "https://vignette.wikia.nocookie.net/theflophouse/images/0/0a/No-image-available.png/revision/latest?cb=20140219035154": movie.Poster;
			output += `
				<div class="col-md-3">
					<div class="text-center">
						<img class="moviePoster" src="${image}">
						<h5>${movie.Title}</h5>
						<a onclick="showMovie('${movie.imdbID}')" class="btn" href="#">Movie Details</a>
					</div>
				</div>

			`;
		});
		$('#movies').html(output);
	});
}

function showMovie(id){
	$.getJSON('http://www.omdbapi.com/?apikey=' + apikey + '&s=' + encodeURI(name));
}

function saveMovie(){

}

function login(user, password){
	if(user === userData['username']){
		if(password === userData['password']){
			localStorage.setItem('user', userData['username']);
		}else{
			alert("La contraseña no es correcta");
		}
	}else{
		alert("El usuario no es correcto");
	}
}