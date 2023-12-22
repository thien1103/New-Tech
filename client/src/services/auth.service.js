import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + "signin", {
        username,
        password
      });
      console.log(response.data)

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    try {
      const response = await axios.post(API_URL + "signup", {
        username,
        email,
        password
      });

      return response.data;
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
  }
}

export default new AuthService();