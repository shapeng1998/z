import { useState, useRef, type PointerEventHandler } from 'react'
import { ImageViewerProps } from './ImageViewer'
import { cn } from '../../utils'

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
  const [dragging, setDragging] = useState(false)

  /** 非拖拽状态下元素的位置偏移 */
  const posRef = useRef<Point>({ x: 0, y: 0 })

  /** 拖拽过程中元素的位置偏移 */
  const offsetRef = useRef<Point>({ x: 0, y: 0 })

  /** 拖拽起始点坐标 */
  const initialRef = useRef<Point>({ x: 0, y: 0 })

  /** 当前拖拽的方向 */
  const axisRef = useRef<Axis>(null)

  /** 当前拖拽事件的 `pointerId` */
  const pointerIdRef = useRef<number | null>(null)

  const start: PointerEventHandler = (e) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    pointerIdRef.current = e.pointerId
    initialRef.current = { x: e.clientX, y: e.clientY }
  }

  const move: PointerEventHandler = (e) => {
    if (e.pointerId !== pointerIdRef.current) return

    const offset: Point = {
      x: e.clientX - initialRef.current.x,
      y: e.clientY - initialRef.current.y,
    }
    if (!axisRef.current) axisRef.current = getCurrentAxis(offset)
    if (axisRef.current !== 'y') return

    if (!dragging) setDragging(true)
    setTranslateY(offset.y + posRef.current.y)
    offsetRef.current = offset
  }

  const end: PointerEventHandler = () => {
    setDragging(false)
    initialRef.current = { x: 0, y: 0 }
    posRef.current.y += offsetRef.current.y
    offsetRef.current = { x: 0, y: 0 }
    axisRef.current = null
    pointerIdRef.current = null
  }

  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="grid h-[800px] max-w-sm place-items-center overflow-hidden rounded-xl border-2 border-solid border-slate-200">
        <img
          className={cn(
            'w-full cursor-grab touch-none rounded-xl',
            dragging && 'cursor-grabbing',
          )}
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
    </div>
  )
}
