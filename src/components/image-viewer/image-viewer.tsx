import { ImageViewerWithFramerMotion } from './image-viewer-with-framer-motion';
import { ImageViewerWithUseGesture } from './image-viewer-with-use-gesture';
import { ImageViewerWithVanillaReact } from './image-viewer-with-vanilla-react';

export interface ImageViewerProps {
  src: string;
  type: 'vanilla-react' | 'use-gesture' | 'framer-motion';
}

export const ImageViewer = ({ src, type }: ImageViewerProps) => {
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
