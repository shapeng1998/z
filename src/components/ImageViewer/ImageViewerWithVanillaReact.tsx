import { useState, useRef, type PointerEventHandler } from 'react'
import { ImageViewerProps } from './ImageViewer'

export interface Point {
  x: number
  y: number
}

function getCurrentDirection(offset: Point) {
  const absDx = Math.abs(offset.x)
  const absDy = Math.abs(offset.y)

  return absDx > absDy ? 'x' : 'y'
}

export const ImageViewerWithVanillaReact = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  const [translateY, setTranslateY] = useState(0)
  const posRef = useRef<Point>({ x: 0, y: 0 })
  const initialRef = useRef<Point>({ x: 0, y: 0 })
  const draggingRef = useRef(false)

  const start: PointerEventHandler = (e) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    initialRef.current = { x: e.clientX, y: e.clientY }
    draggingRef.current = true
  }

  const move: PointerEventHandler = (e) => {
    if (!draggingRef.current) return

    const offset: Point = {
      x: e.clientX - initialRef.current.x,
      y: e.clientY - initialRef.current.y,
    }
    if (getCurrentDirection(offset) !== 'y') return

    setTranslateY(offset.y + posRef.current.y)
  }

  const end: PointerEventHandler = () => {
    initialRef.current = { x: 0, y: 0 }
    draggingRef.current = false
    posRef.current.y = translateY
  }

  return (
    <div className="grid h-screen w-screen place-items-center">
      <img
        className="w-full touch-none rounded-xl"
        src={src}
        alt="Lorem Picsum"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      />
    </div>
  )
}
