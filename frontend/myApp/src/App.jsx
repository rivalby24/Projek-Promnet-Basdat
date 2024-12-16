import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/loginpage";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admindashboard"; // Pisahkan admin dashboard
import RegisterPage from "./pages/registerpage";
import Homepage from "./pages/homepage";
import Tentang from "./pages/tentang";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    {/* Rute Publik */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tentang" element={<Tentang />} />

                    {/* Rute Private */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute
                                element={<Dashboard />}
                                allowedRoles={["Mahasiswa"]}
                            />
                        }
                    />
                    <Route
                        path="/admindashboard"
                        element={
                            <PrivateRoute
                                element={<AdminDashboard />}
                                allowedRoles={["Admin"]}
                            />
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
