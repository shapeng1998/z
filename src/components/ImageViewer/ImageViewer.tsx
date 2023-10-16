import { ImageViewerWithUseGesture } from './ImageViewerWithUseGesture'
import { ImageViewerWithFramerMotion } from './ImageViewerWithFramerMotion'
import { ImageViewerWithVanillaReact } from './ImageViewerWithVanillaReact'

export interface ImageViewerProps {
  src: string
  type: 'vanilla-react' | 'use-gesture' | 'framer-motion'
}

const ImageViewer = ({ src, type }: ImageViewerProps) => {
  switch (type) {
    case 'use-gesture':
      return <ImageViewerWithUseGesture src={src} />
    case 'framer-motion':
      return <ImageViewerWithFramerMotion src={src} />
    case 'vanilla-react':
      return <ImageViewerWithVanillaReact src={src} />
  }
}

export default ImageViewer
