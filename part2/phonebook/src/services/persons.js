import axios from 'axios'
const baseUrl = '/api/persons' 

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { create, getAll, deletePerson, update }