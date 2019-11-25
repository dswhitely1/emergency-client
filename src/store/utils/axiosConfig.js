import axios from 'axios';

const url = 'http://localhost:3333/api';

export const axiosNoAuth = () => axios.create({baseURL: url});

export const axiosWithAuth = token => axios.create({
    baseUrl: url,
    headers: {
        'Authorization': token
    }
});
