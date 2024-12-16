import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/loginpage.css";
import Medali from "../assets/Medal.png";

function Loginpage() {
  const { loginUser, user, loading, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      loginUser(email, password);
    }
  };

  // Redirect if user is already logged in
  if (user) {
    if (user.role === "Admin") return <Navigate to="/admindashboard" replace />;
    if (user.role === "Mahasiswa" || user.role === "Alumni")
      return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <div className="login-left">
        <h1 className="login-title">MASUK</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan Email"
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">
            Kata Sandi
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Masukkan Kata Sandi"
            className="login-input"
            required
          />

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Masuk"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            Lupa kata sandi?
          </Link>
          <span>
            Belum punya akun?{" "}
            <Link to="/register" className="register-link">
              <strong>Daftar</strong>
            </Link>
          </span>
        </div>
      </div>

      {/* Right Side: Information */}
      <div className="login-right">
        <div className="image-placeholder">
          <img src={Medali}/>
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
