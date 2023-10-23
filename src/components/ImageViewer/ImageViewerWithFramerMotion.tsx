import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { type ImageViewerProps } from './ImageViewer';
import { cn } from '@/lib/utils';

export const ImageViewerWithFramerMotion = ({ src }: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false);

  const start = useCallback(() => {
    setDragging(true);
  }, []);

  const end = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="grid h-[800px] max-w-sm place-items-center overflow-hidden rounded-xl border-2 border-solid border-slate-200">
        <motion.img
          className={cn('w-full cursor-grab touch-none rounded-xl', dragging && 'cursor-grabbing')}
          src={src}
          width="380"
          height="570"
          alt="Lorem Picsum"
          drag="y"
          dragDirectionLock={true}
          dragMomentum={false}
          onDragStart={start}
          onDragEnd={end}
        />
      </div>
    </div>
  );
};
