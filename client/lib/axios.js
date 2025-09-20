import axios from 'axios'

 const axiosIns = axios.create({
    baseURL : 'http://localhost:3434/api',
    withCredentials : true
})
export default axiosIns