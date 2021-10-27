import React, { useEffect, useRef } from 'react'

let previous
let current
let interval
let context
let lastNotify = 0

const isMotion = (current, previous, threshold) => {
  let diff = 0
  for (let x = 0; x < current.length; x += 4) {
    diff += Math.abs(current[x] - previous[x])
  }
  return diff > threshold
}

const Motion = ({
  onMotion = () => console.log('Motion Detected'),
  detectInterval = 100,
  width = 64,
  height = 48,
  motionThreshold = 50000,
  minTimeBetween = 3000,
  showElements = false // required for safari to function
}) => {
  const canvasRef = useRef()
  const videoRef = useRef()
  const constraints = {
    audio: false,
    video: { width, height }
  }

  useEffect(() => {
    context = canvasRef.current.getContext('2d')
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream
        interval = setInterval(() => {
          context.drawImage(videoRef.current, 0, 0, width, height)
          const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
          current = imageData.data

          if (previous && current !== previous) {
            if (isMotion(current, previous, motionThreshold)) {
              if (Date.now() - minTimeBetween > lastNotify) {
                onMotion()
                lastNotify = Date.now()
              }
            }
          }
          previous = current
        }, 100)
      })
      .catch(e => {
        console.log(e)
      })

    return () => {
      clearInterval(interval)
    }
  }, [])

  const style = showElements ? {} : { display: 'none' }
  return (
    <>
      <video style={style} autoPlay ref={videoRef} />
      <canvas style={style} ref={canvasRef} width={width} height={height} />
    </>
  )
}

export default Motion
