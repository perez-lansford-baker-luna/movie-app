"use strict";

const apiUrl = "https://utopian-absorbing-network.glitch.me/movies";

const movieContainer = $("#movie-container");
const loader = $(".loader");


// ======= Functions for Displaying Data =======

function displayMovie(movie) {
    return `<div class="card m-4 d-none d-md-flex" style="width: 18rem;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.rating}</p>
                        <button class="editBtn btn btn-dark m-4" type="button">Edit</button>
                        <button id="delBtn" class="delBtn btn btn-dark m-4" type="button" data-value="${movie.id}">Delete</button>
<!--                        Added data value above so js knows what we are targeting-->


<!--                        <a href="#" class="btn btn-dark m-4">Edit</a>-->
<!--                        <a href="#" class="btn btn-dark m-4">Delete</a>-->
                    </div>
				</div>`
}

function displayMovies(movies) {
    return movies.reduce((acc, curr) => {
        return acc.concat(displayMovie(curr))
    }, '')
}

// ======= Fetching movies =======
const getMovies = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(movies => {
            $(loader).hide();
            $(movieContainer).html(displayMovies(movies));
            addDeleteEvents();
        })
        .catch(console.error);
}
getMovies();


// 	======= Getting Movie Id =======

const getMovie = title => fetch(`${apiUrl}/${title}`)
    .then(response => response.json())
    .catch(console.error);

// console.log(getMovie(1).then(data => console.log(data)));
// console.log(getMovie(2));


// ======= Delete Movies =======

const deleteMovie = id => fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(() => {
        console.log(`success: deleted movie of ${id}`)
        getMovies();
    })
    .catch(console.error);


// ======= Edit Movie =======
const editMovie = (movie, id) => fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(movie)
})
    .then(response => response.json())
    .then(data => {
        let $newTitle = $("#movieNameInput").val();
        let $newRating = $("#movieRatingInput").val();
        let newData = {
            title: $newTitle,
            rating: $newRating
        }
        $(".card-body").empty();
        console.log(data.id);

    })
    .catch(console.error);

// console.log(editMovie({movie: 1,
//     title: "something",
//     rating: 5}));


// ======= Adding Movies =======
const addMovie = movie => fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(response => response.json())
    .then(data => {
        let newMovie = data[data.length - 1]
        getMovies()
    })
    .catch(console.error);

function createMovieObject() {
    let $newTitle = $("#exampleFormControlInput1").val();
    let $newRating = $("#exampleFormControlSelect1").val();
    let newMovie = {
        title: $newTitle,
        rating: $newRating,
    }
    return addMovie(newMovie)
}


// ======== click events

$(".editBtn").click((e) => {
    console.log('edited');
})

// Delete button
function addDeleteEvents() {
    $(".delBtn").click(function (e) {
        e.preventDefault();
        let id = $(this).attr('data-value');
        console.log(id)
        return deleteMovie(id)
    })
}


// Add movie button
$(".movieBtn").click(function (e) {
    e.preventDefault()
    return createMovieObject();
})
