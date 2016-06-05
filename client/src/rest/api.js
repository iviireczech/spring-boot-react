import axios from 'axios';
import config from '../config/config';

export const request = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type": "application/json"
    },
    transformRequest: (data) => JSON.stringify(data),
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

request.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

request.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    if (!err.data) {
        err.data = { errorMessage: "Internal Server Error" };
    }
    if (err.status == 401) {
        return Promise.reject(err.data);
    }
    return Promise.reject(err.data);
});