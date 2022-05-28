import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject, config())
  return response.then((response) => response.data)
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const comment = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/comments`, newObject)
  return request.data
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove, comment }
