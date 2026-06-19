import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function login(credentials) {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials)
  return response.data
}

export async function register(userData) {
  const response = await axios.post(`${API_BASE}/auth/register`, userData)
  return response.data
}

export function setAuthHeader(token) {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
}

export default { login, register, setAuthHeader }
