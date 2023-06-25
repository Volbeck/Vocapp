import axios from 'axios';
import { BaseURL, Refresh } from '../urls';

const authFetch = axios.create({
  baseURL: BaseURL,
});

authFetch.interceptors.request.use(
  (request) => {
    let token = localStorage.getItem('token');
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.post(BaseURL + Refresh)
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

export default authFetch;