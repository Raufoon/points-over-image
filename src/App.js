import React, {useMemo} from 'react';
import usePointsData from './hooks/usePointsData';
import useCanvas from './hooks/useCanvas';
import sampleImage from './assets/sample.jpg'
import './App.css';

function App() {
  const points = usePointsData()
  const [canvas, draggedElem, selectPoint, dragPoint, dropPoint] = useCanvas(points)

  const getRelativeXY = useMemo(function() {
    return function(mouse) {
      const {left, top} = canvas.getBoundingClientRect()
      return {
        x: parseInt(mouse.clientX - left, 10), 
        y: parseInt(mouse.clientY - top, 10)
      }
    }
  }, [canvas])

  const selectPointOnCanvas = useMemo(function() {
    return function(mouse) {
      const {x, y} = getRelativeXY(mouse)
      selectPoint(x, y)
    }
  }, [getRelativeXY, selectPoint])

  const dropPointOnCanvas = useMemo(function() {
    return function(mouse) {
      const {x, y} = getRelativeXY(mouse)
      dropPoint(x, y)
    }
  }, [getRelativeXY, dropPoint])

  const dragPointOnCanvas = useMemo(function() {
    return function(mouse) {
      if (!draggedElem) return;
      const {x, y} = getRelativeXY(mouse)
      dragPoint(x, y)
    }
  }, [getRelativeXY, draggedElem, dragPoint])

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
      </div>
      
      <button>Upload New Points</button>
    </div>
  );
}

export default App;
