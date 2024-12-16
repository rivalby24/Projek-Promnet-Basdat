import React from 'react';
import '../styles/tentang.css'; // Pastikan untuk menambahkan CSS jika diperlukan

function Tentang() {
  return (
    <div className="about-tab">
      <div className="about-box">
        <h2>Tentang SIPTM</h2>
        <p>
          Sekilas informasi mengenai aplikasi web SIPTM
        </p>
      </div>
      <div className="about-description">
        <p>
          Sistem Informasi Profil dan Talenta Mahasiswa (SIPTM) adalah aplikasi berbasis web yang bertugas untuk menaungi data mahasiswa berprestasi, berpusat di Program Studi Pendidikan Ilmu Komputer, Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam, Universitas Pendidikan Indonesia.
        </p>
      </div>
    </div>
  );
}

export default Tentang;
