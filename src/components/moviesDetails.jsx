import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import the star icons
import { motion } from "framer-motion"; // Import Framer Motion

export const MoviesDeatils = () => {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
    const [review, setReview] = useState(""); // Manage review input
    const [rating, setRating] = useState(0); // Manage rating (stars)
    const [moviesReview, setMoviesReview] = useState([]); 

    const location = useLocation();
    const moviesDetail = location.state; // This will give you the moviesDetail object

    const CAST_CREW = moviesDetail ? `https://api.themoviedb.org/3/movie/${moviesDetail.id}/credits?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US` : null;
    const SIMILAR_MOVIES = moviesDetail ? `https://api.themoviedb.org/3/movie/${moviesDetail.id}/similar?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1` : null;
    const MOVIES_REVIEWS = moviesDetail ? `https://api.themoviedb.org/3/movie/${moviesDetail.id}/reviews?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1` : null;

    useEffect(() => {
        if (!moviesDetail) {
            return;
        }
        axios.get(CAST_CREW).then((res) => {
            setCast(res.data.cast);
            setCrew(res.data.crew);
        }).catch((err) => {
            console.log(err);
        });

        axios.get(SIMILAR_MOVIES).then((res) => {
            setSimilarMovies(res.data.results);
        }).catch((err) => {
            console.log(err);
        });

        axios.get(MOVIES_REVIEWS).then((res) => {
            console.log(res.data.results);
        });
    }, [CAST_CREW, MOVIES_REVIEWS, SIMILAR_MOVIES, moviesDetail]);

    const navigate = useNavigate();
    const handleNavigate = (moviesDetail) => {
        navigate('/details', { state: moviesDetail });
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    // Adding reviews to DataBase
    const addDataToDb = async () => {
        const userName = auth.currentUser?.displayName;

        if (!userName) {
            console.log("User not authenticated");
            return;
        }

        try {
            const collRef = collection(db, "Movies");
            await addDoc(collRef, {
                "movieName": moviesDetail.title,
                "review": review,
                "stars": rating,
                "userName": userName,
            });
            console.log("Review added successfully");
        } catch (error) {
            console.error("Error adding review to DB: ", error);
        }
    };

    useEffect(() => {
        const getMoviesReview = async () => {
            const collRef = collection(db, 'Movies');
            const q = query(collRef, where("movieName", "==", moviesDetail.title));

            try {
                const querySnapshot = await getDocs(q);
                const reviews = [];
                querySnapshot.forEach((doc) => {
                    reviews.unshift(doc.data());  // Push each review into the array
                });
                setMoviesReview(reviews);  // Set all the reviews to the state
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };

        if (moviesDetail) {
            getMoviesReview(); // Fetch reviews when the movie details are available
        }

    }, [moviesDetail, isModalOpen]);

    const handleReviewSubmit = () => {
        if (!review || !rating) {
            alert("Please enter a review and rating");
            return;
        }

        addDataToDb(); // Add the review to the Firestore database
        setReview(""); // Clear the review input
        setRating(0); // Reset the rating
        setIsModalOpen(false); // Close the modal after submission
    };

    return (
        <>
            <motion.div className="details-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className="first-section">
                    <motion.div className="movieDetail-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
                        <img loading="lazy" height={300} style={{ borderRadius: "2rem", marginTop: "1rem" }} src={`https://image.tmdb.org/t/p/w500${moviesDetail.backdrop_path}`} alt={moviesDetail.title} />
                        <h3>{moviesDetail.original_title}</h3>
                        <p style={{ textAlign: "left" }}><i style={{ fontWeight: "600", textShadow: "0 0 2px #ffffff, 0 0 5px #ffffff, 0 0 10px #ffffff", color: "black", marginLeft: "1rem" }}>Movie Overview :</i> <br />
                            {moviesDetail.overview}
                        </p>
                        <motion.button className="moviesButton" onClick={toggleModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
                            Post Review
                        </motion.button>
                    </motion.div>

                    {/* Modal for posting a review */}
                    {isModalOpen && (
                        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="modal-content">
                                <p>Post Your Review</p>
                                <div className="stars">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={index < rating ? "filled-star" : "empty-star"}
                                            onClick={() => handleStarClick(index)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    className="reviewTextBox"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review here..."
                                    rows="4"
                                    cols="50"
                                />
                                <div className="modal-actions">
                                    <motion.button onClick={handleReviewSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        Submit
                                    </motion.button>
                                    <motion.button onClick={toggleModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                        Cancel
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                        <h6>Cast</h6>
                    <motion.div className="cast-Card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                        {
                            cast?.map((currCast, index) => (
                                <motion.div key={index} className="Cast-scroll" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <img loading="lazy" height={100} width={100} style={{ borderRadius: "50%" }} src={`https://image.tmdb.org/t/p/w500${currCast.profile_path}`} alt='No image' />
                                    <p className="cast-name" style={{ fontSize: "0.7rem" }}>{currCast.original_name.length > 5 ? `${currCast.original_name.substring(0, 8)}...` : currCast.original_name}</p>
                                </motion.div>
                            ))
                        }
                    </motion.div>

                        <h6>Crew</h6>
                    <motion.div className="cast-Card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                        {
                            crew?.map((currCast, index) => (
                                <motion.div key={index} className="Cast-scroll" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <img loading="lazy" height={100} width={100} style={{ borderRadius: "50%" }} src={`https://image.tmdb.org/t/p/w500${currCast.profile_path}`} alt='' />
                                    <p className="cast-name" style={{ fontSize: "0.7rem" }}>{currCast.original_name.length > 5 ? `${currCast.original_name.substring(0, 8)}...` : currCast.original_name}</p>
                                    <p className="cast-job" style={{ fontSize: "0.7rem" }}>{currCast.job}</p>
                                </motion.div>
                            ))
                        }
                    </motion.div>

                        <h6 style={{ margin: "1rem" }}>Similar Movies</h6>
                    <motion.div className="similar-movies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>
                        {
                            similarMovies?.map((currMovies) => (
                                <motion.div key={currMovies.id} onClick={() => handleNavigate(currMovies)} className="similar-container" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                    <img loading="lazy" src={`https://image.tmdb.org/t/p/w500${currMovies.poster_path}`} alt="no image" />
                                    <p>{currMovies.original_title}</p>
                                </motion.div>
                            ))
                        }
                    </motion.div>
                </div>

                <motion.div className="second-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                    <h4 style={{ margin: "1rem", fontSize: "1.3rem" }}>Reviews by Cinema Ela Users</h4>
                    {moviesReview.length === 0 ? (
                        <p style={{ fontSize: "1.5rem", margin: "1rem" }}>No reviews yet. Post Your review</p>
                    ) : null}
                    {moviesReview.map((res, index) => (
                        <motion.div key={index} className="review-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.2, duration: 0.5 }}>
                            <div className="review-user">
                                <div>
                                    <FaUserCircle className="userIcon" />
                                    <p className="userPara"><strong>{res.userName}</strong></p>
                                </div>
                                <div className="starss">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <span key={starIndex}>
                                            {starIndex < res.stars ? <FaStar /> : <FaRegStar />}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="review-content">
                                <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>{res.review}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
};

