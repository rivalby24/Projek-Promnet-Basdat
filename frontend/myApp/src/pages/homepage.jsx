import React from "react";
import '../styles/homepage.css';

function Homepage() {
  return (
    <>
      {/* Bagian Menu Dalam */}
      <div className="menu_dalam">
        <div className="main-content">
          <div className="search-box">
            <h2>Cari Portofolio Kamu!</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Kata Kunci: Nama Mahasiswa/Fakultas"
              />
              <button>
                <img src="search-icon.png" alt="Ikon Pencarian" />
              </button>
            </div>
          </div>
          <div className="description">
            <h1>SIPTM</h1>
            <p><strong>Sistem Informasi Profil dan Talenta Mahasiswa</strong></p>
            <p>Tempat yang mewadahi bidang prestasi mahasiswa</p>
          </div>
        </div>
      </div>

      {/* Bagian Kontainer */}
      <div className="container">
        <div className="header">
          <h1>Prestasi Mahasiswa Terkini</h1>
        </div>
        <div className="achievements">
          <AchievementCard
            imgSrc="https://via.placeholder.com/80"
            name="Muhammad Rivaldy"
            amount="2300000"
            event="International Data Olympics"
          />
          <AchievementCard
            imgSrc="https://via.placeholder.com/80"
            name="Muhammad Syahrul R."
            amount="2300000"
            event="International Sport Parade"
          />
          <AchievementCard
            imgSrc="https://via.placeholder.com/80"
            name="Naufal Fadhilah"
            amount="2300000"
            event="Web Design Parade"
          />
        </div>
        <div className="view-more">
          <a href="#">Lihat selengkapnya...</a>
        </div>

        {/* Bagian Statistik */}
        <div className="statistics">
          <h2>Statistik Mahasiswa Berprestasi</h2>
          <div className="stat-cards">
            <StatCard faculty="Fakultas Komputer" count="10,980 orang" />
            <StatCard faculty="Fakultas Matematika" count="21,011 orang" />
            <StatCard faculty="Fakultas Seni" count="29,001 orang" />
            <StatCard faculty="Fakultas Bahasa" count="11,756 orang" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-100 text-center mt-5 py-3 bg-dark text-white">
        <p>&copy; Company 2024</p>
      </footer>
    </>
  );
}

function AchievementCard({ imgSrc, name, amount, event }) {
  return (
    <div className="achievement-card">
      <img src={imgSrc} alt={`Foto ${name}`} />
      <h3>{name}</h3>
      <p>{amount}</p>
      <p>{event}</p>
    </div>
  );
}

function StatCard({ faculty, count }) {
  return (
    <div className="stat-card">
      <h3>{faculty}</h3>
      <p>{count}</p>
    </div>
  );
}

export default Homepage;
