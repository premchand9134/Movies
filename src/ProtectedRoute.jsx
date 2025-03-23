import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect to signin if no token
    }
  }, [token, navigate]);

  if (!token) {
    // You can return some loading state or null here to prevent rendering protected content
    return <div>Redirecting to Signin Page...</div>;
  }

  return children; // Render protected content if token exists
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
