import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { SignIn } from "./components/form/signin";
import { Signup } from "./components/form/signup";
import { Home } from "./components/Home";
import { useEffect } from "react";
import './App.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { User } from "./components/user";
import { Reviews } from "./components/reviews";
import { MoviesDeatils } from "./components/moviesDetails"; 

function App() {
  // Define the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/reviews",
      element: <Reviews />,
    },
    {
      path: "/details",
      element: <MoviesDeatils />, 
    },
  ]);

  // AuthProvider should be rendered inside RouterProvider so useNavigate() works
  function AuthProvider() {
    const navigate = useNavigate();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/'); // If user is logged in, navigate to home
          console.log('user is logged in');
        } else {
          navigate('/signin'); // If no user, navigate to sign-in page
          console.log('There is no user');
        }
      });
    }, [navigate]); // Add navigate as a dependency to prevent stale closure

    return null; // This component doesn't render anything
  }

  return (
    <RouterProvider router={router}>
      <AuthProvider /> {/* Place the AuthProvider inside RouterProvider */}
    </RouterProvider>
  );
}

export default App;
