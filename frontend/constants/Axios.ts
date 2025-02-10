import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { auth } from "@/constants/firebase";
const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;

// Create an axios instance
const Axios = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to include the access token in every request
Axios.interceptors.request.use(
  async (config) => {
    // Get the current logged-in user from Firebase Auth
    const user = auth.currentUser;

    if (user) {
      const accessToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const accessToken = await AsyncStorage.getItem("idToken");
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Return the updated config
    return config;
  },
  (error) => {
    // Handle any errors with the request
    return Promise.reject(error);
  }
);

export default Axios;
