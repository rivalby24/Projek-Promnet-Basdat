import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom"; // Import Navigate untuk redirection
import AuthContext from "../context/AuthContext";
import "../styles/loginpage.css"; // Pastikan ada file CSS yang sesuai

function Loginpage() {
  const { loginUser, user } = useContext(AuthContext); // Ambil user dari AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email, password);
  };

  // Jika user sudah login, redirect ke halaman lain
  if (user) {
    if (user.program_studi === "Admin") {
      return <Navigate to="/admindashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  

  return (
    <div className="login-container">
      {/* Bagian Kiri: Form Login */}
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

          <button type="submit" className="login-button">
            Masuk
          </button>

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

      {/* Bagian Kanan: Informasi */}
      <div className="login-right">
        <div className="image-placeholder">
          <span>Gambar</span>
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
