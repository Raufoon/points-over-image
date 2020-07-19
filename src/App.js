import React, {useMemo} from 'react';
import usePointsData from './hooks/usePointsData';
import useCanvas from './hooks/useCanvas';
import sampleImage from './assets/sample.jpg'
import './App.css';
import { submitPoints } from './services/network';

// The Main React Component 
function App() {
  // All the points are fetched from server using Hook
  const points = usePointsData()

  // Canvas hook is attached for canvas manipulation
  const [canvas, draggedElem, getModifiedPoints, selectPoint, dragPoint, dropPoint] = useCanvas(points)

  // Calculates relative x,y with respect to the canvas
  // useMemo() prevents it from getting recreated at every render unless the dependencies change
  const getRelativeXY = useMemo(function() {
    return function(mouse) {
      const {left, top} = canvas.getBoundingClientRect()
      return {
        x: parseInt(mouse.clientX - left, 10), 
        y: parseInt(mouse.clientY - top, 10)
      }
    }
  }, [canvas])

  // Selects a point on canvas on mouse drop
  const selectPointOnCanvas = useMemo(function() {
    return function(mouse) {
      const {x, y} = getRelativeXY(mouse)
      selectPoint(x, y)
    }
  }, [getRelativeXY, selectPoint])

  // Deselects a point on canvas on mouse release
  const dropPointOnCanvas = useMemo(function() {
    return function(mouse) {
      const {x, y} = getRelativeXY(mouse)
      dropPoint(x, y)
    }
  }, [getRelativeXY, dropPoint])

  // Drags the previously selected point on canvas
  const dragPointOnCanvas = useMemo(function() {
    return function(mouse) {
      if (!draggedElem) return;
      const {x, y} = getRelativeXY(mouse)
      dragPoint(x, y)
    }
  }, [getRelativeXY, draggedElem, dragPoint])

  // Submits the changed points to the server (WARNING: the free JSON server fails to store the data)
  const submitNewPoints = useMemo(function() {
    return function() {
      console.log('Submitting', getModifiedPoints())
      submitPoints(getModifiedPoints())
    }
  }, [getModifiedPoints])

  // Render the views
  return (
    <div className="App"> 
      <label>Drag the points to adjust them</label>
     
      <div id="canvasContainer">
        <img id="canvasBackground" src={sampleImage} alt="canvas background"/>
        
        <canvas 
          id="canvas" 
          onMouseUp={dropPointOnCanvas} 
          onMouseMove={dragPointOnCanvas}
          onMouseDown={selectPointOnCanvas}></canvas>

        <div id="pointTooltip"></div>
      </div>
      
      <button onClick={submitNewPoints}>Upload New Points</button>
    </div>
  );
}

export default App;
