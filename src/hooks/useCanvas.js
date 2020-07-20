import {useState, useRef, useEffect, useMemo} from 'react'

// A global variable to access the canvas from everywhere
let canvas;

// A React HOOK for using the canvas
export default function useCanvas(initialPoints) {
  // A mutable and persistant object to store the points
  const pointsRef = useRef(initialPoints || [])
 
  // State to hold the dragged point
  const [draggedElem, setDraggedElem] = useState(null)
  
  // Some constants
  const DOT = 4
  const HDOT = 2

  // Shows a tooltip over the selected point
  const showPointTooltip = useMemo(function() {
    return function(x, y) {
      const tooltip = document.getElementById('pointTooltip')
      tooltip.innerHTML = `(${x}, ${y})`
      tooltip.style.top = (y + 10) + 'px';
      tooltip.style.left = (x + 10) + 'px';
    }
  }, [])

  // Hides the last visible tooltip
  const hidePointTooltip = useMemo(function() {
    return function() {
      const tooltip = document.getElementById('pointTooltip')
      tooltip.innerHTML = ``
    }
  }, [])

  // Draw a Point at position (x,y) 
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

  // Draw a Point at position (x,y) at NEXT AVAILABLE FRAME
  const drawPointSmoothly = useMemo(function() {
    return function(x, y) {
      window.requestAnimationFrame(() => drawPoint(x, y))
    }
  }, [drawPoint])

  // Draws all the points on the canvas after clearing the canvas
  const drawAllPoints = useMemo(function() {
    return function() {
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      pointsRef.current.forEach((({x, y}) => drawPointSmoothly(x, y)))
    }
  }, [drawPointSmoothly, pointsRef])
  
  // A React side effect to initialize the canvas based on the background image size
  // Also draws the initial points on the canvas
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

  // Selects a point near the proximity of a mouse click
  // If more than one points are selected, keeps the first one
  const selectPoint = useMemo(function() {
    return function(px, py) {
      const pointsOnCanvas = pointsRef.current
      const selectedPoints = pointsOnCanvas.filter(function(point) {
        const {x, y} = point
        return (Math.abs(px-x) < DOT+2) && (Math.abs(py-y) < DOT+2) 
      })

      if (selectedPoints.length > 0) {
        const selected = selectedPoints[0]
        setDraggedElem(selected)
        const {x, y} = selected
        showPointTooltip(x, y)
        console.log("SELECT", x, y)
      }
    }
  }, [pointsRef, setDraggedElem, showPointTooltip])

  // Allows dragging a point after detecting it with selectPoint()
  const dragPoint = useMemo(function() {
    return function(x, y) {
      if (draggedElem) {
        draggedElem.x = x
        draggedElem.y = y
        showPointTooltip(x, y)
        drawAllPoints()
      }
    }
  }, [draggedElem, drawAllPoints, showPointTooltip])

  // Stops dragging when mouse click released
  const dropPoint = useMemo(function() {
    return function() {
      if (draggedElem) {
        drawAllPoints()
        hidePointTooltip()
        console.log("DROPPED! Current state of points:", pointsRef.current)
      }
      setDraggedElem(null)
    }
  }, [draggedElem, setDraggedElem, drawAllPoints, hidePointTooltip])

  // Gives the current state of all the points after all the previous changes
  const getModifiedPoints = useMemo(function() {
    return function() {
      return pointsRef.current.slice()
    }
  }, [pointsRef])

  // A hook should return some values to the calling React component
  return [canvas, draggedElem, getModifiedPoints, selectPoint, dragPoint, dropPoint]
}
