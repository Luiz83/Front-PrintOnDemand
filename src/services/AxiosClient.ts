import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://ec2-3-144-24-58.us-east-2.compute.amazonaws.com:5131/',
});

export default axiosClient;