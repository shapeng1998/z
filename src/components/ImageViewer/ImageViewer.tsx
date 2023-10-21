import { ImageViewerWithUseGesture } from './ImageViewerWithUseGesture';
import { ImageViewerWithFramerMotion } from './ImageViewerWithFramerMotion';
import { ImageViewerWithVanillaReact } from './ImageViewerWithVanillaReact';

export interface ImageViewerProps {
  src: string;
  type: 'vanilla-react' | 'use-gesture' | 'framer-motion';
}

const ImageViewerComponentMap: Record<ImageViewerProps['type'], typeof ImageViewerWithVanillaReact> = {
  'vanilla-react': ImageViewerWithVanillaReact,
  'use-gesture': ImageViewerWithUseGesture,
  'framer-motion': ImageViewerWithFramerMotion,
};

const ImageViewer = ({ src, type }: ImageViewerProps) => {
  const ImageViewerComponent = ImageViewerComponentMap[type];
  return <ImageViewerComponent src={src} />;
};

export default ImageViewer;
