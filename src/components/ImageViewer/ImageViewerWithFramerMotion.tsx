import { useState } from 'react'
import { ImageViewerProps } from './ImageViewer'
import { motion } from 'framer-motion'
import { cn } from '../../utils'

export const ImageViewerWithFramerMotion = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false)

  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="grid h-[800px] max-w-sm place-items-center overflow-hidden rounded-xl border-2 border-solid border-slate-200">
        <motion.img
          className={cn(
            'w-full cursor-grab touch-none rounded-xl',
            dragging && 'cursor-grabbing',
          )}
          src={src}
          alt="Lorem Picsum"
          drag="y"
          dragDirectionLock={true}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
        />
      </div>
    </div>
  )
}
