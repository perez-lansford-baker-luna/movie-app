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
                        <button class="btn btn-dark m-4" type="button" data-value="${movie.id}">Edit</button>
                        <button class="delBtn btn btn-dark m-4" type="button" data-value="${movie.id}">Delete</button>
<!--                        Added data value above so js knows what we are targeting-->
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


// ======= Adding Movies =======
const addMovie = movie => fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(response => response.json())
    .then(() => {
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
        // $(".card-body").empty();
        // getMovies();
        console.log(data);
        console.log(movie);
    })
    .catch(console.error);


// // modal variables
// let $closebtn = $(".close-button");
// const $modal = $(".modal");
// // modal popup functions
// function toggleModal() {
//     $modal.toggle("show-modal");
// }
// function windowOnClick(e) {
//     if (e.target === $modal) {
//         toggleModal();
//     }
// }
// // modal popup events
// $("#editBtn").click(toggleModal);
// $closebtn.click(toggleModal);
// window.addEventListener("click", windowOnClick);



// ======== click events

$("#editButton").click((e) => {
    e.preventDefault()
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
