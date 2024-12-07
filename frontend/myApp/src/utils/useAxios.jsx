import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  // Ensure that authTokens exists before using it
  if (!authTokens) {
    throw new Error("authTokens is missing, user is not authenticated.");
  }

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  // Interceptor for handling token expiration and refreshing the token
  axiosInstance.interceptors.request.use(
    async (req) => {
      const user = jwtDecode(authTokens.access); // Decode the access token
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      // If the token is expired, refresh it
      if (isExpired) {
        try {
          const response = await axios.post(`${baseURL}/token/refresh`, {
            refresh: authTokens.refresh,
          });

          // Update localStorage and context with the new tokens
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));

          req.headers.Authorization = `Bearer ${response.data.access}`; // Update the request header with the new access token
        } catch (error) {
          console.error("Error refreshing token", error);
        }
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
