// frontend/src/services/api.ts
import axios from 'axios';

// Use environment variable for API URL (optional but good practice)
// Create a .env file in frontend/ with VITE_API_BASE_URL=http://localhost:5001/api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attaches JWT token to outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ensure the header is set correctly
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional): Handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access - e.g., log user out, redirect to login
      console.warn("Unauthorized access detected (401). Logging out.");
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Use window.location or router history to redirect
      // This is a basic example; a more robust solution might involve the AuthContext
      window.location.href = '/login'; // Adjust if not using root-level paths for login
    }
    // Important: Always reject the promise so individual calls can handle other errors
    return Promise.reject(error);
  }
);


export default apiClient;