import React, { useState, useEffect } from 'react';
import axios from './axios'; // Assuming axios is configured to handle API requests
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]); // State to store the list of movies
    const [trailerUrl, setTrailerUrl] = useState(""); // State to store the YouTube trailer URL

    // Fetch movies using the provided URL
    useEffect(() => {
        async function fetchMovies() {
            try {
                const request = await axios.get(); // Fetch data using axios
                console.log(fetchUrl)
                setMovies(request.data.results); // Set the movies state with the results
                console.log(request.data.results)
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, [fetchUrl]); // Depend on fetchUrl to refetch when it changes

   /* 
    
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=54de653595ccc2e118604096bcb8e899")
            .then(res => res.json())
            .then(json => {
                // Ensure the response has results and is an array
                const movies = json.results;
                
            
*/
    // Options for the YouTube player
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1, // Autoplay the video
        },
    };

    // Handle clicking on a movie poster to show the trailer
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(''); // Close the trailer if it's already open
        } else {
            // Use movie-trailer to find the trailer on YouTube
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v')); // Extract the video ID from the URL
                })
                .catch((error) => console.log('Error finding trailer:', error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id} // Add key for efficient list rendering
                        onClick={() => handleClick(movie)} // Click handler to show trailer
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name || movie.title || movie.original_name} // Add alt text
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} {/* Render YouTube player if a trailer URL is set */}
        </div>
    );
}

export default Row;
