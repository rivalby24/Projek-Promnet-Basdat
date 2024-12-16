import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Navigate for redirection
import AuthContext from "../context/AuthContext"; // AuthContext to manage auth state
import "../styles/loginpage.css"; // Importing CSS for styling

function Loginpage() {
  const { loginUser, user, loading, error } = useContext(AuthContext); // Use context to get login state and error

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Ensure email and password are not empty before attempting login
    if (email.length > 0 && password.length > 0) {
      loginUser(email, password); // Call loginUser to handle authentication
    }
  };

  // If user is already logged in, navigate to the appropriate dashboard based on their role
  if (user) {
    if (user.role === "Admin") {
      return <Navigate to="/admindashboard" replace />; // Admin redirected to admin dashboard
    } else if (user.role === "Mahasiswa") {
      return <Navigate to="/dashboard" replace />; // Mahasiswa (student) redirected to student dashboard
    } else if (user.role === "Alumni") {
      return <Navigate to="/dashboard" replace />; // Alumni redirected to alumni dashboard
    } else {
      return <Navigate to="/" replace />; // Default route if no matching role
    }
  }

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <div className="login-left">
        <h2 className="title">MASUK</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan Email"
            required
          />

          <label>Kata Sandi</label>
          <input
            type="password"
            name="password"
            placeholder="Masukkan Kata Sandi"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Masuk"} {/* Show loading text while authenticating */}
          </button>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          <div className="options">
            <Link to="/forgot-password" className="forgot-password">
              Lupa kata sandi?
            </Link>
            <span className="register">
              Belum punya akun?{" "}
              <Link to="/register">
                <strong>Daftar</strong>
              </Link>
            </span>
          </div>
        </form>
      </div>

      {/* Right Side: Information */}
      <div className="login-right">
        <div className="image-placeholder">
          <span>Gambar</span> {/* Placeholder for image */}
        </div>
        <div className="info">
          <h3>Sistem Informasi Profil dan Talenta Mahasiswa</h3>
          <p>Wadah untuk bidang prestasi mahasiswa</p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
