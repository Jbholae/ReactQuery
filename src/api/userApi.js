import axios from "axios";

const api = axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
    headers: {
        'Authorization': 'Bearer ${apiToken}'
    }
})

export const createUser = (newUser) => api.post('/users', newUser).then(res => res.data);