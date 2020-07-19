import {useState, useRef, useEffect, useMemo} from 'react'

let canvas;

export default function useCanvas(initialPoints) {
  const pointsRef = useRef(initialPoints || [])
  const [draggedElem, setDraggedElem] = useState(null)
  const DOT = 4
  const HDOT = 2

  const drawPoint = useMemo(function() {
    return function(x, y) {
      const context = canvas.getContext('2d')
      context.fillStyle = "#000"
      context.fillRect(x-HDOT, y-HDOT, DOT, DOT)
      context.beginPath()
      context.arc(x, y, DOT + 2, 0, 2 * Math.PI)
      context.stroke()
    }
  }, [])

  const drawAllPoints = useMemo(function() {
    return function() {
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      pointsRef.current.forEach((({x, y}) => drawPoint(x, y)))
    }
  }, [drawPoint, pointsRef])
  
  useEffect(function initCanvas() {
    canvas = document.getElementById('canvas')
    const background = document.getElementById('canvasBackground')  
    background.onload = function() {
      canvas.width = parseInt(background.offsetWidth, 10)
      canvas.height = parseInt(background.offsetHeight, 10)
    }
    if (initialPoints) {
      pointsRef.current = initialPoints
      drawAllPoints()
    }
  }, [initialPoints, drawAllPoints])

  const selectPoint = useMemo(function() {
    return function(px, py) {
      const pointsOnCanvas = pointsRef.current
      const selectedPoints = pointsOnCanvas.filter(function(point) {
        const {x, y} = point
        return (Math.abs(px-x) < DOT+2) && (Math.abs(py-y) < DOT+2) 
      })

      if (selectedPoints.length > 0) {
        setDraggedElem(selectedPoints[0])
        console.log("SELECT", selectedPoints[0].x, selectedPoints[0].y)
      }
    }
  }, [pointsRef, setDraggedElem])

  const dragPoint = useMemo(function() {
    return function(x, y) {
      if (draggedElem) {
        draggedElem.x = x
        draggedElem.y = y
        drawAllPoints()
      }
    }
  }, [draggedElem, drawAllPoints])

  const dropPoint = useMemo(function() {
    return function() {
      if (draggedElem) {
        drawAllPoints()
        console.log("DROPPED! Current state of points:", pointsRef.current)
      }
      setDraggedElem(null)
    }
  }, [draggedElem, setDraggedElem, drawAllPoints])

  const getModifiedPoints = useMemo(function() {
    return function() {
      return pointsRef.current.slice()
    }
  }, [pointsRef])

  return [canvas, draggedElem, getModifiedPoints, selectPoint, dragPoint, dropPoint]
}
