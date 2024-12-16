import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/registerpage.css";
import Medali from "../assets/Medal.png";

function Registerpage() {
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // State untuk role
  const [nim, setNim] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [program_studi, setProgramStudi] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fakultasList, setFakultasList] = useState([]);
  const [programStudiList, setProgramStudiList] = useState([]);

  const { registerUser } = useContext(AuthContext);

  // Fetch fakultas dynamically from the backend
  useEffect(() => {
    const fetchFakultas = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/fakultas/"); // Endpoint untuk daftar fakultas
      const data = await response.json();
      setFakultasList(data);
    };
    fetchFakultas();
  }, []);

  // Fetch program studi based on selected fakultas
  useEffect(() => {
    if (fakultas) {
      const fetchProgramStudi = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/fakultas/${fakultas}/programstudi/`); // Endpoint untuk program studi berdasarkan fakultas
        const data = await response.json();
        setProgramStudiList(data);
      };
      fetchProgramStudi();
    } else {
      setProgramStudiList([]); // Reset program studi list jika fakultas diubah
    }
  }, [fakultas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }
    registerUser(full_name, username, email, role, nim, fakultas, program_studi, semester, password, password2);
  };

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="register-left">
        <div className="register-image">
          <img src={Medali} alt="" />
        </div>
        <h2>Sistem Informasi Profil dan Talenta Mahasiswa</h2>
        <p>Wadah untuk bidang prestasi mahasiswa</p>
      </div>

      {/* Right Section */}
      <div className="register-right">
        <h2>DAFTAR</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Nama Lengkap"
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

          <select onChange={(e) => setRole(e.target.value)} value={role} required>
            <option value="" disabled>Status</option>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Alumni">Alumni</option>
          </select>

          <input
            type="text"
            placeholder="NIM"
            onChange={(e) => setNim(e.target.value)}
            required
          />

          <select onChange={(e) => setFakultas(e.target.value)} value={fakultas} required>
            <option value="" disabled>Pilih Fakultas</option>
            {fakultasList.map((fak) => (
              <option key={fak.id} value={fak.id}>
                {fak.nama}
              </option>
            ))}
          </select>

          <select 
            onChange={(e) => setProgramStudi(e.target.value)} 
            value={program_studi} 
            required 
            disabled={!fakultas} // Disable if fakultas is not selected
          >
            <option value="" disabled>Pilih Program Studi</option>
            {programStudiList.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.nama}
              </option>
            ))}
          </select>

          {/* Semester Input with additional text */}
          <div className="semester-input">
            <input
              type="number"
              placeholder="Semester"
              onChange={(e) => setSemester(e.target.value)}
              min="1"
            />
          </div>

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
