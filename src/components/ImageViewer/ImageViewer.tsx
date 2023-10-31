import { ImageViewerWithFramerMotion } from './ImageViewerWithFramerMotion';
import { ImageViewerWithUseGesture } from './ImageViewerWithUseGesture';
import { ImageViewerWithVanillaReact } from './ImageViewerWithVanillaReact';

export interface ImageViewerProps {
  src: string;
  type: 'vanilla-react' | 'use-gesture' | 'framer-motion';
}

const ImageViewer = ({ src, type }: ImageViewerProps) => {
  if (type === 'vanilla-react') {
    return <ImageViewerWithVanillaReact src={src} />;
  }
  if (type === 'use-gesture') {
    return <ImageViewerWithUseGesture src={src} />;
  }
  if (type === 'framer-motion') {
    return <ImageViewerWithFramerMotion src={src} />;
  }
};

export default ImageViewer;
