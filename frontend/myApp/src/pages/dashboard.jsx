import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { jwtDecode } from 'jwt-decode';
import '../styles/dashboard.css';

function Dashboard() {
  const [res, setRes] = useState('');
  const [role, setRole] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const api = useAxios();
  const token = localStorage.getItem('authTokens');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
      setUserDetails({
        nim: decodedToken.nim,
        username: decodedToken.username,
        full_name: decodedToken.full_name,
        program_studi: decodedToken.program_studi,
        semester: decodedToken.semester,
        image: decodedToken.image,
      });
    }
  }, [token]);

  useEffect(() => {
    if (role === 'Admin') {
      return <Navigate to="/admindashboard" replace />;
    }
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        const response = await api.get('/dashboard/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setRes(response.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [api]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.post('/dashboard/', {
          text: 'Some text here',
        });
        setRes(response.data.response);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
    fetchPostData();
  }, [api]);

  if (role === 'Admin') {
    return <Navigate to="/admindashboard" replace />;
  }

  return (
<div>
  <div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <nav className="col-md-3 col-lg-2 d-none d-md-block sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home" />
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <span>Hello, {userDetails.username}!</span>
            </div>
            <div className="alert alert-success">
              <strong>{res}</strong>
            </div>
            <h2>Profil Diri</h2>
            <div className="card " style={{ backgroundColor: '#f2d2b2', color: 'black' }}>
              <div className="card-body">
                <h5 className="card-title">{userDetails.full_name}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {userDetails.username} <br />
                  <strong>NIM:</strong> {userDetails.nim} <br />
                  <strong>Fakultas:</strong> {userDetails.fakultas} <br />
                  <strong>Program Studi:</strong> {userDetails.program_studi} <br />
                  <strong>Semester:</strong> {userDetails.semester}
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
