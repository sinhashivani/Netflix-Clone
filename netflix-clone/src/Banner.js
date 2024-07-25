import React, { useState, useEffect } from 'react';
import "./Banner.css"

function Banner() {
    const [movie, setMovie] = useState(null); // Initialize as null for a single movie object

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=54de653595ccc2e118604096bcb8e899")
            .then(res => res.json())
            .then(json => {
                // Ensure the response has results and is an array
                const movies = json.results;
                if (movies && movies.length > 0) {
                    // Select a random movie
                    const randomIndex = Math.floor(Math.random() * movies.length);
                    setMovie(movies[randomIndex]);
                }
            })
            .catch(error => console.error('Error fetching movie:', error));
    };

    useEffect(() => {
        getMovie();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if (!movie) {
        return <div>Loading...</div>; // Show a loading message while the movie is being fetched
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {/* Accounts for APIs giving different formatting */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner_fadeBottom"></div>
        </header>
    );
}

export default Banner;
