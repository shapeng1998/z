import { ImageViewerWithFramerMotion } from './ImageViewerWithFramerMotion';
import { ImageViewerWithUseGesture } from './ImageViewerWithUseGesture';
import { ImageViewerWithVanillaReact } from './ImageViewerWithVanillaReact';

export interface ImageViewerProps {
  src: string;
  type: 'vanilla-react' | 'use-gesture' | 'framer-motion';
}

const ImageViewer = ({ src, type }: ImageViewerProps) => {
  let ImageViewerComponent: typeof ImageViewerWithVanillaReact | null = null;

  if (type === 'vanilla-react') ImageViewerComponent = ImageViewerWithVanillaReact;
  else if (type === 'use-gesture') ImageViewerComponent = ImageViewerWithUseGesture;
  else if (type === 'framer-motion') ImageViewerComponent = ImageViewerWithFramerMotion;
  else throw TypeError(`Unknown type: ${type}`);

  return <ImageViewerComponent src={src} />;
};

export default ImageViewer;
