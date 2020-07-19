import React from 'react';
import usePointsData from './hooks/usePointsData';
import './App.css';

function App() {
  const points = usePointsData()
  console.log(points)

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
