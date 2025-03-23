import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { User } from "./components/user";
import { Reviews } from "./components/reviews";
import { MoviesDeatils } from "./components/moviesDetails"; 
import { AppLayout } from "./components/ui/Applayout";
import { SignIn } from "./components/form/signin";
import { Signup } from "./components/form/signup";
import ProtectedRoute from "./ProtectedRoute";
import { Loader } from "./components/ui/loader"; // Assuming Loader is your loading spinner component
import  { Suspense } from "react";

// Define your routes with loaders for data fetching
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<Loader />}><Home /></Suspense>, // Show loader while Home is loading
      },
      {
        path: "/user",
        element: <Suspense fallback={<Loader />}><User /></Suspense>, // Show loader while User is loading
      },
      {
        path: "/reviews",
        element: <Suspense fallback={<Loader />}><Reviews /></Suspense>, // Show loader while Reviews is loading
      },
      {
        path: "/details",
        element: <Suspense fallback={<Loader />}><MoviesDeatils /></Suspense>, // Show loader while Movie Details is loading
      },
    ]
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
