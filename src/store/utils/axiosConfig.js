import axios from 'axios';

// const url = 'http://localhost:3333/api';
const url = process.env.REACT_APP_BASE_URL

export const axiosNoAuth = () => axios.create({baseURL: url});

export const axiosWithAuth = token => axios.create({
    baseURL: url,
    headers: {
        'Authorization': token
    }
});
