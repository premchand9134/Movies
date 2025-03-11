import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1";
const POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1';
const TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1';
const UPCOMING_MOVIES = 'https://api.themoviedb.org/3/movie/upcoming?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1';

export const Main = () => {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const navigate = useNavigate();

    // Fetching movie data
    useEffect(() => {
        axios.get(NOW_PLAYING)
            .then(res => setNowPlaying(res.data.results))
            .catch(error => console.log(error));

        axios.get(POPULAR_MOVIES)
            .then(res => setPopularMovies(res.data.results))
            .catch(error => console.log(error));

        axios.get(TOP_RATED)
            .then(res => setTopRated(res.data.results))
            .catch(error => console.log(error));

        axios.get(UPCOMING_MOVIES)
            .then(res => setUpcomingMovies(res.data.results))
            .catch(error => console.log(error));
    }, []);

    const handleNavigate = (moviesDetail) => {
        console.log(moviesDetail);
        navigate('/details', { state: moviesDetail });
    };

    return (
        <main>
            <h3>Now Playing</h3>
            <div className="main-container">
                {nowPlaying?.map((currMovie) => (
                    <div onClick={() => handleNavigate(currMovie)} className="card" key={currMovie.id}>
                        <img height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.original_title} />
                        <p style={{ textAlign: "center" }}>{currMovie.original_title}</p>
                    </div>
                ))}
            </div>

            <h3>Popular Movies</h3>
            <div className="main-container">
                {popularMovies?.map((currMovie) => (
                    <div onClick={() => handleNavigate(currMovie)} className="card" key={currMovie.id}>
                        <img height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.original_title} />
                        <p style={{ textAlign: "center" }}>{currMovie.original_title}</p>
                    </div>
                ))}
            </div>

            <h3>Top Rated</h3>
            <div className="main-container">
                {topRated?.map((currMovie) => (
                    <div onClick={() => handleNavigate(currMovie)} className="card" key={currMovie.id}>
                        <img height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title}</p>
                    </div>
                ))}
            </div>

            <h3>Upcoming Movies</h3>
            <div className="main-container">
                {upcomingMovies?.map((currMovie) => (
                    <div onClick={() => handleNavigate(currMovie)} className="card" key={currMovie.id}>
                        <img height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};
