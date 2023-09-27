import axios from 'axios';

const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json'
}

const api = axios.create({
    baseURL: `https://quotes-api-flame.vercel.app`,
    headers
})

export default api;