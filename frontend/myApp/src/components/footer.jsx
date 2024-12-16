import React from 'react'
import '../styles/footer.css';

function footer() {
  return (
    <footer>
    <div className="footer-container">
      <div className="footer-logo">
        <h1>
          <span className="logo-highlight">SIP</span>TM
        </h1>
        <p>Sistem Informasi Profil dan Talenta Mahasiswa</p>
      </div>
      <div className="footer-contact">
        <h3>Hubungi Kami</h3>
        <ul>
          <li>→ 08xx - xxxx - xxxx</li>
          <li>→ siptm.mahasiswa2000@upi.edu</li>
          <li>
            → Pendidikan Ilmu Komputer, FPMIPA, <br />
            Universitas Pendidikan Indonesia
          </li>
        </ul>
      </div>
    </div>
    </footer>
  )
}

export default footer