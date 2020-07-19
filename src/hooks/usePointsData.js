import {useState, useEffect} from 'react'
import { fetchPoints } from '../services/network'

// A React hook to fetch all the points from the server
export default function usePointsData() {
  const [points, setPoints] = useState(null)

  // A Side effect to fetch the points ONLY ONCE
  useEffect(function effect() {
    async function fetchData() {
      const data = await fetchPoints()
      console.log('DATA RECEIVED:')
      console.table(data)
      setPoints(data)
    }
    
    if (!points) fetchData()
  }, [points])

  return points
}
