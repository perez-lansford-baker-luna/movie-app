"use-strict";

const apiUrl = "https://utopian-absorbing-network.glitch.me/movies";


    const getMovies = () => fetch(apiUrl)
        .then(response => response.json())
        .catch(console.error);

     console.log(getMovies());

    const getMovie = id => fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .catch(console.error);

    console.log(getMovie());
    // console.log(getMovie(2));

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
//

//
const editMovie = movie => fetch(`${apiUrl}/${movie.title}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(movie)
})
    .then(response => response.json())
    .then(data => {
        console.log(`Edited ${JSON.stringify(data)}`)
        return data[2].title;
    })
    .catch(console.error);

console.log(editMovie(2));

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

// console.log(addMovie());