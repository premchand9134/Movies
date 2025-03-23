import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

 // Access API key from environment variable
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const UPCOMING_MOVIES = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

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
        navigate('/details', { state: moviesDetail });
    };

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {/* Now Playing Movies */}
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>Now Playing</motion.h3>
            <div className="main-container">
                {nowPlaying?.map((currMovie) => (
                    <motion.div
                        onClick={() => handleNavigate(currMovie)}
                        className="card"
                        key={currMovie.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img loading="lazy" height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.original_title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title.length > 10 ? `${currMovie.title.substring(0, 15)}...` : currMovie.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Popular Movies */}
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>Popular Movies</motion.h3>
            <div className="main-container">
                {popularMovies?.map((currMovie) => (
                    <motion.div
                        onClick={() => handleNavigate(currMovie)}
                        className="card"
                        key={currMovie.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img loading="lazy" height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.original_title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title.length > 10 ? `${currMovie.title.substring(0, 15)}...` : currMovie.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Top Rated Movies */}
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>Top Rated</motion.h3>
            <div className="main-container">
                {topRated?.map((currMovie) => (
                    <motion.div
                        onClick={() => handleNavigate(currMovie)}
                        className="card"
                        key={currMovie.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img loading="lazy" height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title.length > 10 ? `${currMovie.title.substring(0, 15)}...` : currMovie.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Upcoming Movies */}
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>Upcoming Movies</motion.h3>
            <div className="main-container">
                {upcomingMovies?.map((currMovie) => (
                    <motion.div
                        onClick={() => handleNavigate(currMovie)}
                        className="card"
                        key={currMovie.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img loading="lazy" height={170} width={150} src={`https://image.tmdb.org/t/p/w500${currMovie.poster_path}`} alt={currMovie.title} />
                        <p style={{ textAlign: "center" }}>{currMovie.title.length > 10 ? `${currMovie.title.substring(0, 15)}...` : currMovie.title}</p>
                    </motion.div>
                ))}
            </div>
        </motion.main>
    );
};


