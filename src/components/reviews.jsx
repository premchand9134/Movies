import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import TrueFocus from './ui/TrueFocus.jsx';
import { FaRegStar, FaStar, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const collRef = collection(db, 'Movies');
            try {
                const snapshot = await getDocs(collRef);
                const rev = [];
                snapshot.forEach(doc => {
                    rev.unshift(doc.data());
                });
                setReviews(rev);
            } catch (error) {
                console.error('Error getting documents', error);
            }
        };
        getReviews();
    }, []);
    console.log(reviews);

    return (
        <motion.div 
            className="review-container"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
        >
            <TrueFocus 
                sentence="All Movies Reviews"
                manualMode={false}
                blurAmount={5}
                borderColor="#00D8FF"
                animationDuration={2}
                pauseBetweenAnimations={1}
            />
            <motion.div 
                className="reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        className="reviewMainDiv"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }} // Delay each review entry
                    >
                        <div className="box-section">
                            <FaUserCircle className="userIcon" />
                            <motion.p 
                                className="userName"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {review.userName}
                            </motion.p>
                        </div>
                        <hr />
                        <p style={{ margin: "1rem" }}>
                            <strong style={{ color: "slategray" }}>Movie Name :</strong> {review.movieName}
                        </p>
                        <motion.div 
                            className="review-stars"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            {[...Array(5)].map((_, starIndex) => (
                                <motion.span
                                    key={starIndex}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {starIndex < review.stars ? <FaStar /> : <FaRegStar />}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.p
                            style={{ margin: "0.5rem" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            {review.review.length > 50 ? `${review.review.substring(0, 100)}...` : review.review}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};
