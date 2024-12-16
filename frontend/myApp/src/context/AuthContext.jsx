import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    const showAlert = (title, icon) => {
        Swal.fire({
            title,
            icon,
            toast: true,
            timer: 6000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                const decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                localStorage.setItem("authTokens", JSON.stringify(data));

                // Log the user data to see what it contains
                console.log("Decoded User:", decodedUser);

                // Navigasi berdasarkan program_studi (role)
                if (decodedUser.role === "Admin") {
                    navigate("/admindashboard");
                } else if (decodedUser.role === "Mahasiswa") {
                    navigate("/dashboard");
                } else if (decodedUser.role === "Alumni") {
                    navigate("/dashboard");
                } else {
                    navigate("/"); // Default route
                }

                showAlert("Login Successful", "success");
            } else {
                showAlert("Invalid Email or Password", "error");
                setError("Invalid Email or Password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            showAlert("An error occurred during login", "error");
            setError("An error occurred during login");
        }
    };

    const registerUser = async (full_name, username, email, role, nim, fakultas, program_studi, semester, password, password2) => {
        if (!email.endsWith("@upi.edu")) {
            showAlert("Email harus menggunakan domain @upi.edu.", "error");
            return;
        }

        if (nim.length !== 7 || isNaN(nim)) {
            showAlert("NIM harus terdiri dari 7 angka.", "error");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name,
                    username,
                    email,
                    role,
                    nim,
                    fakultas,
                    program_studi,
                    semester,
                    password,
                    password2,
                }),
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (response.status === 201) {
                navigate("/login");
                showAlert("Registration Successful. Please login.", "success");
            } else {
                showAlert(data.detail || "An error occurred during registration", "error");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            showAlert("An error occurred during registration", "error");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
        showAlert("You have been logged out", "success");
    };

    const refreshAuthToken = async () => {
        if (!authTokens?.refresh) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: authTokens.refresh }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            logoutUser();
        }
    };

    useEffect(() => {
        if (authTokens) {
            const decoded = jwtDecode(authTokens.access);
            console.log("Decoded JWT on load:", decoded); // Log to verify contents
            setUser(decoded);
        }
        setLoading(false);
    }, [authTokens]);

    useEffect(() => {
        if (user && user.exp) {
            const expiryTime = user.exp * 1000;
            if (Date.now() >= expiryTime - 60000) { // Refresh 1 minute before expiration
                refreshAuthToken();
            }
        }
    }, [user]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
        error, // Add error to context
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
