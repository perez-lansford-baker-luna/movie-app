"use-strict";

const apiUrl = "https://utopian-absorbing-network.glitch.me/movies";

    const getMovies = () => fetch(apiUrl)
        .then(response => response.json())
        .catch(console.error);

    console.log(getMovies());