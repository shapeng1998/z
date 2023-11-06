import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { type ImageViewerProps } from './image-viewer';
import { cn } from '@/lib/utils';

export const ImageViewerWithFramerMotion = ({ src }: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false);

  return (
    <motion.img
      className={cn(
        'h-auto w-full cursor-grab touch-none rounded-xl will-change-transform',
        dragging && 'cursor-grabbing',
      )}
      src={src}
      width="380"
      height="570"
      alt="Lorem Picsum"
      drag="y"
      dragDirectionLock={true}
      dragMomentum={false}
      onDragStart={useCallback(() => setDragging(true), [])}
      onDragEnd={useCallback(() => setDragging(false), [])}
    />
  );
};
