import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Tambahkan import Navigate
import useAxios from '../utils/useAxios';
import { jwtDecode } from 'jwt-decode'; // Pastikan menggunakan default export atau named export yang sesuai

function Dashboard() {
  const [res, setRes] = useState('');
  const api = useAxios();
  const token = localStorage.getItem('authTokens');
  const [Role, setRole] = useState(null);

  let nim, username, role, program_studi, full_name, semester, image;

  if (token) {
    const decode = jwtDecode(token);
    nim = decode.nim;
    username = decode.username;
    full_name = decode.full_name;
    role = decode.role;
    program_studi = decode.program_studi;
    semester = decode.semester;
    image = decode.image;
  }

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setRole(decode.role);
    }
  }, [token]);

  // Redirect jika program_studi adalah "admin"
  if (role === 'Admin') {
    return <Navigate to="/admindashboard" replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (!authTokens) {
          throw new Error('No auth token found');
        }
        const response = await api.get('/dashboard/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log('GET Response:', response.data);
        setRes(response.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.post('/dashboard/', {
          text: 'Some text here',
        });
        console.log('POST Response:', response.data);
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div>
      <div className="container-fluid" style={{ paddingTop: '100px' }}>
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar mt-4">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home" />
                    Dashboard <span className="sr-only"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file" />
                    Profil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="shopping-cart" />
                    Talenta
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="users" />
                    Organisasi
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="bar-chart-2" />
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="layers" />
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">My Dashboard</h1>
              <span>Hello {username}!</span>
            </div>
            <div className="alert alert-success">
              <strong>{res}</strong>
            </div>
            <h2>Profile</h2>
            <div className="card" style={{ maxWidth: '400px' }}>
              <img
                className="card-img-top"
                src={image}
                alt="Profile"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{full_name}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {username} <br />
                  <strong>NIM:</strong> {nim} <br />
                  <strong>Program Studi:</strong> {program_studi} <br />
                  <strong>Semester:</strong> {semester}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
