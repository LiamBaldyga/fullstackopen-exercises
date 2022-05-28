import axios from 'axios'
const baseUrl = '/api/login'

const login = (credentials) => {
  const response = axios
    .post(baseUrl, credentials)
    .then((response) => response.data)
  return response
}

export default { login }
