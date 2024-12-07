import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Changed to import statement

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens")).user  // Ensure you extract user data correctly
            : null
    );

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const showAlert = (title, icon) => {
        Swal.fire({
            title,
            icon,
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.status === 200) {
                console.log("Logged In");
                setAuthTokens(data);
                setUser(jwtDecode(data.access).user);  // Ensure you extract user data correctly
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/");
                showAlert("Login Successful", "success");
            } else {
                console.log(response.status);
                showAlert("Username or password does not exist", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            showAlert("An error occurred during login", "error");
        }
    };

    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, username, password, password2 })
            });

            if (response.status === 201) {
                navigate("/login");
                showAlert("Registration Successful, Login Now", "success");
            } else {
                console.log(response.status);
                showAlert(`An Error Occurred ${response.status}`, "error");
            }
        } catch (error) {
            console.error("Registration error:", error);
            showAlert("An error occurred during registration", "error");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
        showAlert("You have been logged out...", "success");
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access).user);  // Ensure you extract user data correctly
        }
        setLoading(false); // Set loading to false after checking tokens
    }, [authTokens]);

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};