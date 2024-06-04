import axios from 'axios';

const BASE_URL = "http://localhost:5000/"
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWFkNmM3MzJiYmIyNTkyM2NmZGQ5NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNzMxNTU0MCwiZXhwIjoxNzE3NTc0NzQwfQ.2fz2_agUhiOUgzXLOd0HN1JkHYxJX_FGbyTDAFx2Sv8"

export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})

userRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (token) {
            config.headers['token'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);