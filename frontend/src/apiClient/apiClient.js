import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:3000/'
    : 'https://pawmingle-backend.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
