import axios from 'axios'
let wyyAPI = axios.create({
    baseURL:'http://39.106.201.40:3000',
    timeout:5000
})
export default wyyAPI