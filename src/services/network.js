/**
 * An utility module to make network requests
 * Provides two methods:
 *    - fetchPoints: fetches all the points from the free JSON server
 *    - submitPoints: mimics a fake post request to the server
 */
import axios from 'axios' 

export function fetchPoints() {
  return axios.get('https://my-json-server.typicode.com/raufoon/points-data/points')
    .then(response => response.data.map(point => {
      return {
        x: point.x, 
        y: point.y
      }
    }))
}

export function submitPoints(points) {
  return axios.post('https://my-json-server.typicode.com/raufoon/points-data/points', {
    points: points.map((point, id) => ({
      ...point, 
      id
    }))
  }, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(function() {
    console.log("Submission Successful!!")
  })
}
