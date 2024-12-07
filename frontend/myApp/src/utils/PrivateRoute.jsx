import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Assuming the path is correct

const PrivateRoute = ({ element, ...rest }) => {
  let { user } = useContext(AuthContext);

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the element (protected component)
  return element;
};

export default PrivateRoute;
