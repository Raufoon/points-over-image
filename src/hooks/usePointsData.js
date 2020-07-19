import {useState, useEffect} from 'react'
import { fetchPoints } from '../services/network'

export default function usePointsData() {
  const [points, setPoints] = useState(null)

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
