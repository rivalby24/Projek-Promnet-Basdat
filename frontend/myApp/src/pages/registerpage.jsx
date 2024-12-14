import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Registerpage() {
  const [full_name, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [nim, setNim] = useState("")
  const [program_studi, setProgramStudi] = useState("")
  const [semester, setSemester] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const {registerUser} = useContext(AuthContext)

  console.log(full_name);
  console.log(username);
  console.log(email);
  console.log(nim);
  console.log(program_studi);
  console.log(semester);
  console.log(password);
  console.log(password2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }
    registerUser(full_name, username, email, nim, program_studi, semester, password, password2);
};


  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h2 fw-bold mb-0">
                            Welcome to <b>SIPTM </b>
                          </span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                          Sign Up
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="fullname"
                            className="form-control form-control-lg"
                            placeholder="Full Name"
                            onChange={e => setFullName(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Email Address"
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                        
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="nim"
                            className="form-control form-control-lg"
                            placeholder="NIM"
                            onChange={e => setNim(e.target.value)}
                            autoComplete='NIM'
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <select
                            id="prodi"
                            className="form-control form-control-lg"
                            onChange={e => setProgramStudi(e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Pilih Program Studi</option>
                            <option value="Pendidikan Ilmu Komputer">Pendidikan Ilmu Komputer</option>
                            <option value="Ilmu Komputer">Ilmu Komputer</option>
                          </select>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                            type="number"
                            id="semester"
                            className="form-control form-control-lg"
                            placeholder="Semester"
                            onChange={e => setSemester(e.target.value)}
                            />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                           type="password"
                           id="passwordInput"
                           className="form-control form-control-lg"
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                           autoComplete="new-password"
                           />
                        </div>
                        <div className="form-outline mb-4">
                           <input
                           type="password"
    id="confirmPasswordInput"
    className="form-control form-control-lg"
    placeholder="Confirm Password"
    onChange={(e) => setPassword2(e.target.value)}
    autoComplete="new-password"
  />
</div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Register
                          </button>
                        </div>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Already have an account?{" "}
                          <Link to="/login" style={{ color: "#393f81" }}>
                            Login Now
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registerpage;
