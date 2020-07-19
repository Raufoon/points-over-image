/**
 * An utility module to make network requests
 * Provides two methods:
 *    - fetchPoints: fetches all the points from the free JSON server
 *    - submitPoints: saves the points to the server
 */
import axios from 'axios' 

const SERVER = `https://us-central1-lllivepolll.cloudfunctions.net/server`

export function fetchPoints() {
  return axios.get(`${SERVER}/dummy`)
    .then(response => response.data.map(point => {
      return {
        x: point.x, 
        y: point.y
      }
    }))
}

export function submitPoints(points) {
  return axios.post(`${SERVER}/dummy`, {
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
