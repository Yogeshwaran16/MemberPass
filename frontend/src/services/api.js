import axios from 'axios';

// Base API URL configured from environment variable
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const EXPRESS_API_URL =
  import.meta.env.VITE_EXPRESS_API_URL || 'http://localhost:5000';

// Axios instance for FastAPI / AI service
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Axios instance for Express backend
export const expressClient = axios.create({
  baseURL: EXPRESS_API_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;

