import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.20:3333'
  // baseURL: 'http://192.168.1.112:3333'
  // baseURL: `${process.env.LOCAL_IP}:33333`
})

export default api