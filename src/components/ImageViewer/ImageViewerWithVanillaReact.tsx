import { useState, useRef, type PointerEventHandler } from 'react'
import { ImageViewerProps } from './ImageViewer'

export interface Point {
  x: number
  y: number
}

type Axis = 'x' | 'y' | null

function getCurrentAxis(offset: Point, threshold = 10): Axis {
  const absDx = Math.abs(offset.x)
  const absDy = Math.abs(offset.y)

  if (absDx > absDy && absDx > threshold) return 'x'
  if (absDy > absDx && absDy > threshold) return 'y'
  return null
}

export const ImageViewerWithVanillaReact = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  const [translateY, setTranslateY] = useState(0)

  /** 非拖拽状态下元素的位置偏移 */
  const posRef = useRef<Point>({ x: 0, y: 0 })

  /** 拖拽起始点坐标 */
  const initialRef = useRef<Point>({ x: 0, y: 0 })

  /** 是否正在拖拽 */
  const draggingRef = useRef(false)

  /** 当前拖拽的方向 */
  const axisRef = useRef<Axis>(null)

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
    if (!axisRef.current) axisRef.current = getCurrentAxis(offset)
    if (axisRef.current !== 'y') return

    setTranslateY(offset.y + posRef.current.y)
  }

  const end: PointerEventHandler = () => {
    initialRef.current = { x: 0, y: 0 }
    draggingRef.current = false
    posRef.current.y = translateY
    axisRef.current = null
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
