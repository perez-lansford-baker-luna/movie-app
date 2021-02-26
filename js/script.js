"use-strict";

const apiUrl = "https://utopian-absorbing-network.glitch.me/movies";

    const getMovies = () => fetch(apiUrl)
        .then(response => response.json())
        .catch(console.error);

    // console.log(getMovies());

    const getMovie = id => fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    console.log(getMovie(1));
    // console.log(getMovie(2));