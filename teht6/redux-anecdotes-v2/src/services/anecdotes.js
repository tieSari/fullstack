import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'
//const getId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes:0 })
  return response.data
}

export default { getAll, createNew }