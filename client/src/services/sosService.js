import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchSOSRequests() {
  const response = await axios.get(`${API_BASE}/sos`)
  return response.data
}

export async function createSOSRequest(requestData) {
  const response = await axios.post(`${API_BASE}/sos`, requestData)
  return response.data
}

export async function updateSOSRequest(id, requestData) {
  const response = await axios.put(`${API_BASE}/sos/${id}`, requestData)
  return response.data
}

export async function resolveSOSRequest(id) {
  const response = await axios.patch(`${API_BASE}/sos/${id}/resolve`)
  return response.data
}

export default { fetchSOSRequests, createSOSRequest, updateSOSRequest, resolveSOSRequest }
