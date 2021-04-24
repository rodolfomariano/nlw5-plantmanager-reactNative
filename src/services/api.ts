import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.16:3333'
  // baseURL: 'http://192.168.1.112:3333'
})

export default api