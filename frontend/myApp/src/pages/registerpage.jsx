import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/registerpage.css"

function Registerpage() {
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [program_studi, setProgramStudi] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }
    registerUser(full_name, username, email, nim, program_studi, semester, password, password2);
  };

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="register-left">
        <div className="register-image">Gambar</div>
        <h2>Sistem Informasi Profil dan Talenta Mahasiswa</h2>
        <p>Wadah untuk bidang prestasi mahasiswa</p>
      </div>

      {/* Right Section */}
      <div className="register-right">
        <h2>DAFTAR</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="NIM"
            onChange={(e) => setNim(e.target.value)}
            required
          />
          <select onChange={(e) => setProgramStudi(e.target.value)} defaultValue="" required>
            <option value="" disabled>
              Pilih Program Studi
            </option>
            <option value="Pendidikan Ilmu Komputer">Pendidikan Ilmu Komputer</option>
            <option value="Ilmu Komputer">Ilmu Komputer</option>
          </select>
          <input
            type="number"
            placeholder="Semester"
            onChange={(e) => setSemester(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button type="submit">Daftar</button>
        </form>
        <p>
          Sudah punya akun?{" "}
          <Link to="/login" className="login-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registerpage;
