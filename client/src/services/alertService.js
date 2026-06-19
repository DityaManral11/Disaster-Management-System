import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchAlerts() {
  const response = await axios.get(`${API_BASE}/alerts`)
  return response.data
}

export async function createAlert(alertData) {
  const response = await axios.post(`${API_BASE}/alerts`, alertData)
  return response.data
}

export async function updateAlert(id, alertData) {
  const response = await axios.put(`${API_BASE}/alerts/${id}`, alertData)
  return response.data
}

export async function deleteAlert(id) {
  const response = await axios.delete(`${API_BASE}/alerts/${id}`)
  return response.data
}

export default { fetchAlerts, createAlert, updateAlert, deleteAlert }
