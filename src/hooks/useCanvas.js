import {useEffect} from 'react'

let canvas, background, context;

function initCanvas() {
  background = document.getElementById('canvasBackground')

  canvas = document.getElementById('canvas')
  
  background.onload = function() {
    canvas.width = parseInt(background.offsetWidth, 10)
    canvas.height = parseInt(background.offsetHeight, 10)
  }
  
  context = canvas.getContext('2d')
}

export default function useCanvas() {
  useEffect(function effect() {
    initCanvas()
  }, [])

  function drawPoint() {
    //context.draw
  }

  return [drawPoint]
}
