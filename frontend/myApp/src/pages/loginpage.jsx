import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../index.css";

function Loginpage() {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email);
    console.log(password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#9A616D",
      }}
    >
      <div className="card" style={{ width: "400px", borderRadius: "1rem" }}>
        <div className="card-body p-4 p-lg-5 text-black">
          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center mb-3 pb-1">
              <i
                className="fas fa-cubes fa-2x me-3"
                style={{ color: "#ff6219" }}
              />
              <span className="h2 fw-bold mb-0">Welcome back 👋</span>
            </div>
            <h5
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: 1 }}
            >
              Sign into your account
            </h5>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example17"
                className="form-control form-control-lg"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example27"
                className="form-control form-control-lg"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="pt-1 mb-4">
              <button
                className="btn btn-dark btn-lg btn-block w-100"
                type="submit"
              >
                Login
              </button>
            </div>
            <a className="small text-muted" href="#!">
              Forgot password?
            </a>
            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#393f81" }}>
                Register Now
              </Link>
            </p>
            <a href="#!" className="small text-muted">
              Terms of use.
            </a>
            <a href="#!" className="small text-muted ms-2">
              Privacy policy
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
