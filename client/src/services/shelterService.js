import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchShelters() {
  const response = await axios.get(`${API_BASE}/shelters`)
  return response.data
}

export async function createShelter(shelterData) {
  const response = await axios.post(`${API_BASE}/shelters`, shelterData)
  return response.data
}

export async function updateShelter(id, shelterData) {
  const response = await axios.put(`${API_BASE}/shelters/${id}`, shelterData)
  return response.data
}

export async function deleteShelter(id) {
  const response = await axios.delete(`${API_BASE}/shelters/${id}`)
  return response.data
}

export default { fetchShelters, createShelter, updateShelter, deleteShelter }
