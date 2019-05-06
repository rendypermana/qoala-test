import axios from 'axios'
export const HTTP = axios.create({
    baseURL: `https://randomuser.me/api/`
})