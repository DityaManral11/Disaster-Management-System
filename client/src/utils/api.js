import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://disaster-management-system-vij2.onrender.com'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthToken(token) {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
}

export default api
