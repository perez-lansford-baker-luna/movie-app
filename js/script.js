"use strict";

const apiUrl = "https://utopian-absorbing-network.glitch.me/movies";
const movieContainer = $("#movie-container");
const editButton = $(".editButton");
const deleteButton = $(".deleteButton");



// ======= Fetching movies =======
    const getMovies = () => fetch(apiUrl)
        .then(response => response.json())
        .catch(console.error);

     getMovies()
		 .then(movies => {
		 	$(movieContainer).append(displayMovies(movies))
		 });

// ======= Functions for Displaying Data =======

	function displayMovie(movie) {
		return `<div class="card m-4" style="width: 18rem;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.rating}</p>
                        <a href="#" class="btn btn-primary editButton">Edit</a>
                        <a href="#" class="btn btn-primary deleteButton">Delete</a>
                    </div>
				</div>`
	}

	function displayMovies(movies) {
		return movies.reduce((acc, curr) => {
			return acc.concat(displayMovie(curr))
		}, '')
	}



// 	======= Getting Movie Id =======

    const getMovie = id => fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    console.log(getMovie(1).then(data => console.log(data)));
    // console.log(getMovie(2));

// ======= Delete Movies =======

    const deleteMovie = id => fetch(`${apiUrl}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(() => {

            console.log(`success: deleted movie of ${id}`)
        })
        .catch(console.error);

// ======= Edit Movies =======
    //
    // const editMovie = movie => fetch(`${apiUrl}/${movie.title}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(movie)
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(`Edited ${JSON.stringify(data)}`)
    //         return data[2].title;
    //     })
    //     .catch(console.error);
    //
    // console.log(editMovie(2));

    const editMovie = (movie, id) => fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data + "something")
            // return data[0];
        })
        .catch(console.error);

    // console.log(editMovie({movie: 1,
    //     title: "something",
    //     rating: 5}));


// ======= Adding Movies =======
    const addMovie = movie => fetch(`${apiUrl}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Success: ${JSON.stringify(data)}`);
            return data.id;
        })
        .catch(console.error);


