import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { ImageViewerProps } from './ImageViewer'

export const ImageViewerWithUseGesture = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  const [translateY, setTranslateY] = useState(0)
  const [y, setY] = useState(0)

  const bind = useDrag(
    ({ down, movement: [, my] }) => {
      if (down) {
        setTranslateY(my + y)
      } else {
        setY(translateY)
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
        className="w-full touch-none rounded-xl"
        src={src}
        alt="Lorem Picsum"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      />
    </div>
  )
}
