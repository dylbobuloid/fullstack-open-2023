import axios from 'axios'



//const baseUrl = 'http://localhost:3001/persons'
// Deployed locally
//const baseUrl = 'http://localhost:3001/api/persons'

// When deployed on render
const baseUrl = process.env.REACT_APP_API_URL


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const remove = (id) =>{
    console.log("id number", id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
    
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  
  export default { getAll, create, remove, update }