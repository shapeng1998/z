import { useDrag } from '@use-gesture/react'
import { useRef, useState } from 'react'
import { ImageViewerProps } from './ImageViewer'
import { Point } from './ImageViewerWithVanillaReact'
import { cn } from '../../utils'

export const ImageViewerWithUseGesture = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  const [translateY, setTranslateY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const posRef = useRef<Point>({ x: 0, y: 0 })

  const bind = useDrag(
    ({ pressed, first, last, movement: [, my] }) => {
      if (first) setDragging(true)
      if (last) setDragging(false)
      if (pressed) {
        setTranslateY(my + posRef.current.y)
      } else {
        posRef.current.y += my
      }
    },
    {
      preventDefault: true,
      axis: 'y',
      axisThreshold: {
        mouse: 10,
        touch: 10,
      },
    },
  )

  return (
    <div className="grid h-screen w-screen place-items-center">
      <img
        {...bind()}
        className={cn(
          'w-full cursor-grab touch-none rounded-xl',
          dragging && 'cursor-grabbing',
        )}
        src={src}
        alt="Lorem Picsum"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      />
    </div>
  )
}
