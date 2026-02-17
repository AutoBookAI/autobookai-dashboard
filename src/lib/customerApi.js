import axios from 'axios';

const customerApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

customerApi.interceptors.request.use(cfg => {
  const token = localStorage.getItem('customerToken');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

customerApi.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('customerToken');
      localStorage.removeItem('customer');
      window.location.href = '/portal/login';
    }
    return Promise.reject(err);
  }
);

export default customerApi;
