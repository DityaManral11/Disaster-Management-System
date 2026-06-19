import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchResources() {
  const response = await axios.get(`${API_BASE}/resources`)
  return response.data
}

export async function createResource(resourceData) {
  const response = await axios.post(`${API_BASE}/resources`, resourceData)
  return response.data
}

export async function updateResource(id, resourceData) {
  const response = await axios.put(`${API_BASE}/resources/${id}`, resourceData)
  return response.data
}

export async function deleteResource(id) {
  const response = await axios.delete(`${API_BASE}/resources/${id}`)
  return response.data
}

export default { fetchResources, createResource, updateResource, deleteResource }
