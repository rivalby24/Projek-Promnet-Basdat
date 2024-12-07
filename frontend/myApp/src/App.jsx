import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext"; // Adjust the path as necessary
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/loginpage"; // Capitalize the component
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
