import React, {useMemo} from 'react';
import usePointsData from './hooks/usePointsData';
import useCanvas from './hooks/useCanvas';
import sampleImage from './assets/sample.jpg'
import './App.css';

function App() {
  const points = usePointsData()
  const [canvas, drawPoint] = useCanvas(points)

  const drawPointOnCanvas = useMemo(function() {
    return function(mouse) {
      const {left, top} = canvas.getBoundingClientRect()
      const x = parseInt(mouse.clientX - left, 10)
      const y = parseInt(mouse.clientY - top, 10)
      drawPoint(x, y)
    }
  }, [canvas, drawPoint])

  return (
    <div className="App">
      <label>Drag the points to adjust them</label>
      
      <div id="canvasContainer">
        <img id="canvasBackground" src={sampleImage} alt="canvas background"/>
        <canvas id="canvas" onMouseUp={drawPointOnCanvas}></canvas>
      </div>
      
      <button>Upload New Points</button>
    </div>
  );
}

export default App;
