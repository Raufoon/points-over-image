import axios from 'axios' 

export function fetchPoints() {
  return axios.get('https://my-json-server.typicode.com/raufoon/points-data/points')
    .then(response => response.data)
}

export function submitPoints(points) {
  return axios.post('https://my-json-server.typicode.com/raufoon/points-data/points', {
    points
  }, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
}
