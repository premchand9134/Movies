import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiThemoviedatabase } from "react-icons/si";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

export const NavBar = ({setIsSidebarVisible}) => {
    // Set default state for sidebar visibility
    
    const navigate = useNavigate();
    // console.log("setIsSidebarVisible:", setIsSidebarVisible);

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            // navigate('/signin'); // Redirect to sign-in page after logout
        } catch (error) {
            console.error("Logout error:", error); // Handle error if any during logout
        }
    };

    // Toggle sidebar visibility
    const handleToggle = () => {
        setIsSidebarVisible(prevState => !prevState);  // Toggle visibility
    };

    return (
        <nav>
            <div className="nav-bar">
                <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
                    <GiHamburgerMenu className="logo" onClick={handleToggle} />
                    <SiThemoviedatabase className="nav-logo" />
                    <p>Cinema Elk</p>
                </div>
                <div>
                    <button className="nav-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
        
    );
};
