import { useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  // Decode token only if it exists
  let user_id = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      user_id = decoded.user_id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img style={{ width: "120px", padding: "6px" }} src="https://i.imgur.com/juL1aAc.png" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              {token === null &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              }
              {token !== null &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
