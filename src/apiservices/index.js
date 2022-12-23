import axios from 'axios';
import { token_key } from '../constants/basicConstants';

//TODO: will change for every project
const API_URL = 'PUT_A_SERVER_URL_HERE!';

const Service = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: '*/*',
    },
});

Service.interceptors.request.use(config => {
    const token = localStorage.getItem(token_key);
    config.headers.token = token ? token : '';
    return config;
});

Service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const err = error.response;
        return Promise.reject({
            status: err.status,
            message: err.data.message || '',
        });
    }
);

export default Service;
