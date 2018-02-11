import axios from 'axios'
const baseUrl = 'http://localhost:3011/api/persons'

const getAll = () => {
  return getResponseData(axios.get(baseUrl))
}

const getResponseData = (request) => {
  return request.then(response => response.data)
}

const create = (newObject) => {
  console.log('create kutsuttu ',newObject)
  return getResponseData(axios.post(baseUrl, newObject))
}

const update = (id, newObject) => {
  return getResponseData(axios.put(`${baseUrl}/${id}`, newObject))
}

const deletePerson = (id) => {
  return getResponseData(axios.delete(`${baseUrl}/${id}`))
}

export default { getAll, create, update, deletePerson }