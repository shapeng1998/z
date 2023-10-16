import { ImageViewerProps } from './ImageViewer'
import { motion } from 'framer-motion'

export const ImageViewerWithFramerMotion = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  return (
    <motion.div
      drag="y"
      dragDirectionLock={true}
      dragMomentum={false}
      onPointerDown={(e) => e.preventDefault()}
      className="grid h-screen w-screen place-items-center"
    >
      <img
        className="w-full touch-none rounded-xl"
        src={src}
        alt="Lorem Picsum"
      />
    </motion.div>
  )
}
