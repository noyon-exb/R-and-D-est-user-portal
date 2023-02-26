import axios from 'axios';
import { TOKEN_KEY } from '../constants/basicConstants';

//TODO: will change for every project
const API_URL = 'http://localhost:8085';

const Service = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: '*/*',
    },
});

Service.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    config.headers.token = token ? token : '';
    return config;
});

Service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const err = error.response;
        console.log(err);
        return Promise.reject({
            status: err.status,
            message: err.data.message || '',
        });
    }
);

export default Service;
