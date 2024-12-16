import { useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Hapus curly braces karena default import
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Pastikan CSS diatur di sini
import Logo from "../assets/SIPTM.png"

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  // Cek token dan decode informasi pengguna
  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role; // Mendapatkan role dari token
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Menentukan rute dashboard
  const getDashboardLink = () => {
    if (!role) return "/login"; // Jika tidak ada peran, arahkan ke login
    return role === "Admin" ? "/admindashboard" : "/dashboard";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-text">
        <img
          src={Logo} // Path ke file logo
          alt="SIPTM Logo"
          className="logo-image" // Tambahkan class untuk styling
        />
        </Link>
          </div>
        {/* Navbar Links */}
        <div className="navbar-links">
          <ul className="navbar-menu">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/tentang">Tentang</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
          </ul>
          <ul className="navbar-menu">
            {user ? (
              <>
                <li>
                  <Link to={getDashboardLink()}>Dashboard</Link>
                </li>
                <li>
                  <span onClick={logoutUser} style={{ cursor: "pointer" }}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Masuk</Link>
                </li>
                <li>
                  <Link to="/register">Daftar</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
