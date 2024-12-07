import React from "react";
import '../index.css';  

function Homepage() {
  return (
    <div>
      <main role="main" className="fullscreen-container">
        {/* Fullscreen Centered Content */}
        <div className="container text-center">
          <h1 className="display-3">Cari Portofolio Kamu!</h1>
          <form className="d-flex justify-content-center my-4">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Ketik NIM/Nama Mahasiswa/Prodi"
              style={{ width: "50%" }}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-search"></i> Cari
            </button>
          </form>
          <div>
            <h1 className="fw-bold">SIPTM</h1>
            <p className="mb-0">Sistem Informasi Profil dan Talenta Mahasiswa</p>
            <p className="text-muted">
              Tempat yang memotivasi bidang prestasi mahasiswa
            </p>
          </div>
        </div>
      </main>
      <footer className="w-100 text-center mt-5 py-3 bg-dark text-white">
        <p>© Company 2017-2018</p>
      </footer>
    </div>
  );
}

export default Homepage;
