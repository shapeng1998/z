import { useState } from 'react';
import { useDrag } from '@use-gesture/react';

import { type ImageViewerProps } from './ImageViewer';
import { cn } from '@/lib/utils';

export const ImageViewerWithUseGesture = ({ src }: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false);

  const bind = useDrag(
    ({ offset: [, y], first, last, currentTarget }) => {
      if (first) {
        setDragging(true);
      }
      if (last) {
        setDragging(false);
      }
      (currentTarget as HTMLElement).style.transform = `translateY(${y}px)`;
    },
    {
      preventDefault: true,
      axis: 'y',
      axisThreshold: {
        mouse: 10,
        touch: 10,
      },
    },
  );

  return (
    <img
      {...bind()}
      className={cn('w-full cursor-grab touch-none rounded-xl', dragging && 'cursor-grabbing')}
      src={src}
      width="380"
      height="570"
      alt="Lorem Picsum"
    />
  );
};
