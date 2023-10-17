import { ImageViewerProps } from './ImageViewer'
import { motion } from 'framer-motion'

export const ImageViewerWithFramerMotion = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <motion.img
        className="w-full touch-none rounded-xl"
        src={src}
        alt="Lorem Picsum"
        drag="y"
        dragDirectionLock={true}
        dragMomentum={false}
      />
    </div>
  )
}
