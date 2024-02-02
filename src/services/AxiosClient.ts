import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7132/',
});

export default axiosClient;