import axios from 'axios';

// export const BASE_URL = 'http://127.0.0.1:8000';

export const BASE_URL = 'https://api.t1.academy.dunice-testing.com';

export const axios_request = axios.create({
    baseURL: BASE_URL,
});
