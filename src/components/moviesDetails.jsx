import {  data, useLocation, useNavigate } from "react-router-dom"
import { Aside } from "./ui/aside"
import { NavBar } from "./ui/nav"
import { useEffect, useState } from "react";
import axios from "axios";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import the star icons


export const MoviesDeatils = () =>{

    const [cast,setCast] = useState([])
    const [crew,setCrew] = useState([])
    const [similarMovies,setSimilarMovies] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
    const [review, setReview] = useState(""); // Manage review input
    const [rating, setRating] = useState(0); // Manage rating (stars)
    const [moviesReview, setMoviesReview] = useState([]); 

    
    
    
    const location = useLocation();
    // console.log(location);
    
    const moviesDetail = location.state; // This will give you the moviesDetail object
    
    if (!moviesDetail) {
      return <div>No movie details available.</div>;
    }
    
    const CAST_CREW = `https://api.themoviedb.org/3/movie/${moviesDetail.id}/credits?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US`
    const SIMILAR_MOVIES = `https://api.themoviedb.org/3/movie/${moviesDetail.id}/similar?api_key=6cb1d6fecb9d7f38697a5d2a1db2858c&language=en-US&page=1`

    
    
    useEffect(()=>{
        axios.get(CAST_CREW).then((res)=>{
            // console.log(res.data);            
            setCast(res.data.cast)
            setCrew(res.data.crew)           
            
        }).catch((err)=>{
            console.log(err);
            
        })

        axios.get(SIMILAR_MOVIES).then((res)=>{
            setSimilarMovies(res.data.results)
            
            
        })
       
    },[moviesDetail])

    const navigate = useNavigate()

    const handleNavigate = (moviesDetail) => {
        // console.log(moviesDetail);
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

    //   Adding reviews toi DataBase
    const addDataToDb = async () => {
        const userName = auth.currentUser?.displayName;
        
        if (!userName) {
            console.log("User not authenticated");
            return;
        }
    
        try {
            // Query the existing reviews to get the current count
            const reviewsRef = collection(db, userName);
            const querySnapshot = await getDocs(reviewsRef);
            
            // Get the current count of reviews
            const currentCount = querySnapshot.size;  // Number of existing reviews
    
            // Create a new document reference with the incremented count
            // const docRef = doc(db, "movies", "reviews");
            const collRef = collection(db,"Movies")

            await addDoc(collRef,{
                "movieName": moviesDetail.title,
                "review": review,
                "stars": rating,
                "userName":userName,

            })
    
            // Add the review to the Firestore database
            // await setDoc(docRef, {
            //     movieName: moviesDetail.title,
            //     review: review,
            //     stars: rating,
            // });
    
            console.log("Review added successfully");            

        } catch (error) {
            console.error("Error adding review to DB: ", error);
        }
    };


            // Inside your component
        useEffect(() => {
            const getMoviesReview = async () => {
                const collRef = collection(db, 'Movies');
                const q = query(collRef, where("movieName", "==", moviesDetail.title));
                
                try {
                    const querySnapshot = await getDocs(q);
                    const reviews = [];
                    querySnapshot.forEach((doc) => {
                        reviews.push(doc.data());  // Push each review into the array
                    });
                    setMoviesReview(reviews);  // Set all the reviews to the state
                } catch (error) {
                    console.error("Error getting documents: ", error);
                }
            };

            if (moviesDetail) {
                getMoviesReview(); // Fetch reviews when the movie details are available
            }

        }, [moviesDetail]); // This useEffect runs whenever moviesDetail changes

 
    
      const handleReviewSubmit = (e) => {
        e.preventDefault();
        // console.log("Review:", review);
        // console.log("Rating:", rating);
        // You can submit the review and rating to your backend or API here.
        addDataToDb()
        setIsModalOpen(false); // Close the modal after submission
      };

    // console.log('cast:',cast);
    // console.log('crew:',crew);
    // console.log('similar movies',similarMovies);
    //   console.log('moviesReviews',moviesReview);
      
    return(
        <>
             <div className="grid">
                    <NavBar />  
                    <Aside />  
                    <div className="details-container">
                        <div className="first-section">
                            <div className="movieDetail-card"> 
                            <img height={300} style={{borderRadius:"2rem",marginTop:"1rem"}}  src={`https://image.tmdb.org/t/p/w500${moviesDetail.backdrop_path}`} alt={moviesDetail.title} />
                            <h3>{moviesDetail.original_title}</h3>
                            <p style={{textAlign:"left"}}><i style={{fontWeight:"bold"}}>Movie Overview :</i> <br />
                             {moviesDetail.overview}
                            </p>
                            <button className="moviesButton" onClick={toggleModal}>Post Review</button>
                            </div>
                            {/* Modal for posting a review */}
                            {isModalOpen && (
                            <div className="modal">
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
                                    <button onClick={handleReviewSubmit}>Submit</button>
                                    <button onClick={toggleModal}>Cancel</button>
                                </div>
                                </div>
                            </div>
                            )}
                            
                            <div>
                                    <h6>Cast</h6>
                                <div className="cast-Card">
                                    {
                                       cast?.map((currCast,index)=>{
                                        return(
                                            <div key={index}  className="Cast-scroll">
                                                <img height={100} width={100} style={{borderRadius:"50%"}} src={`https://image.tmdb.org/t/p/w500${currCast.profile_path}`} alt='No image' />
                                                <p style={{fontSize:"0.7rem"}}>{currCast.original_name}</p>
                                            </div>
                                        )
                                       }) 
                                    }
                                </div>
                                <div>
                                    <h6>Crew</h6>
                                    <div className="cast-Card">
                                    {
                                       crew?.map((currCast,index)=>{
                                        return(
                                            <div key={index}  className="Cast-scroll">
                                                <img height={100} width={100} style={{borderRadius:"50%"}} src={`https://image.tmdb.org/t/p/w500${currCast.profile_path}`} alt='' />
                                                <p style={{fontSize:"0.7rem"}}>{currCast.original_name}</p>
                                                <p style={{fontSize:"0.7rem"}}>{currCast.job}</p>
                                                
                                            </div>
                                        )
                                       }) 
                                    }
                                </div>
                                </div>
                            </div>
                            <div>
                                <h6 style={{margin:"1rem"}}>Similar Movies</h6>
                                <div className="similar-movies">
                                    {
                                        similarMovies?.map((currMovies)=>{
                                            return(
                                                <div key={currMovies.id} onClick={()=>handleNavigate(currMovies)} className="similar-container" >
                                                    <img  src={`https://image.tmdb.org/t/p/w500${currMovies.poster_path}`} alt="no imag" />
                                                    <p>{currMovies.original_title}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                       
                        <hr />                     
                              
                            <div className="second-section">
                                <h4 style={{margin:"1rem",fontSize:"1.3rem"}}>Reviews by Cinema Ela Users</h4>
                                {moviesReview.map((res, index) => {
                                    return (
                                        <div className="review-card" key={index}>
                                                                                               
                                            <div className="review-user">
                                                <FaUserCircle style={{fontSize:"1.7rem"}} />
                                                <p className="userPara"><strong>{res.userName }</strong> </p>
                                                {/* Display star ratings based on res.stars */}
                                                <div className="starss">
                                                    {[...Array(5)].map((_, starIndex) => (
                                                        <span key={starIndex}>
                                                        {starIndex < res.stars ? <FaStar /> : <FaRegStar />}
                                                        </span>
                                                    ))}
                                                    
                                                </div>
                                            </div>
                                            <p style={{fontSize:"1.1rem",marginTop:"1rem"}}>Reviews: {res.review}</p>
                                        </div>

                                                );
                                            })}
                            </div>                                
                        </div>
                    </div>
                    
        </>
    )
}




