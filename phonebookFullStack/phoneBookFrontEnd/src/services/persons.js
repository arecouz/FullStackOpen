import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => {
      console.log(response); 
      return response.data;
    });
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  console.log(`${baseUrl}/${id}`)
  console.log(newObject)
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteRequest = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deleteRequest }