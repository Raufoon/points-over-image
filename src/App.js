import React, {useEffect} from 'react';
import usePointsData from './hooks/usePointsData';
import useCanvas from './hooks/useCanvas';
import sampleImage from './assets/sample.jpg'
import './App.css';

function App() {
  const points = usePointsData()
  const [] = useCanvas()

  return (
    <div className="App">
      <label>Drag the points to adjust them</label>
      
      <div id="canvasContainer">
        <img id="canvasBackground" src={sampleImage} alt="canvas background"/>
        <canvas id="canvas"></canvas>
      </div>
      
      <button>Upload New Points</button>
    </div>
  );
}

export default App;
