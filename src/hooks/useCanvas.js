import {useEffect} from 'react'

let canvas;

export default function useCanvas(initialPoints) {
  
  useEffect(function effect() {
    canvas = document.getElementById('canvas')
    const background = document.getElementById('canvasBackground')  
    background.onload = function() {
      canvas.width = parseInt(background.offsetWidth, 10)
      canvas.height = parseInt(background.offsetHeight, 10)
    }
    if (initialPoints) {
      initialPoints.forEach(({x, y}) => drawPoint(x, y))
    }
  }, [initialPoints])

  function drawPoint(x, y) {
    const context = canvas.getContext('2d')
    context.fillStyle = "#000"
    context.fillRect(x, y, 1, 1)
    context.beginPath();
    context.arc(x, y, 4, 0, 2 * Math.PI);
    context.stroke();
  }

  return [canvas, drawPoint]
}
