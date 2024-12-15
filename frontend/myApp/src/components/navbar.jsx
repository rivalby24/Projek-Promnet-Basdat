import { useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Hapus curly braces karena ini adalah default import
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../index.css";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  // Cek token dan decode informasi pengguna
  let programStudi = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      programStudi = decoded.program_studi; // Mendapatkan program_studi dari token
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Menentukan rute dashboard
  const getDashboardLink = () => {
    if (!programStudi) return "/login"; // Jika tidak ada peran, arahkan ke login
    return programStudi === "Admin" ? "/admindashboard" : "/dashboard";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            LOGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Beranda
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tentang">
                  Tentang
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/galeri">
                  Galeri
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kontak">
                  Kontak
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={getDashboardLink()}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
