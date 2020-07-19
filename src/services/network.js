import axios from 'axios' 

const DATA_SERVER = 'https://my-json-server.typicode.com/raufoon/points-data/points'

export function fetchPoints() {
  return axios.get(DATA_SERVER).then(response => response.data)
}
