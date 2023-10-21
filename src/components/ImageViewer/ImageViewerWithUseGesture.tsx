import { useState } from 'react';
import { useDrag } from '@use-gesture/react';

import { type ImageViewerProps } from './ImageViewer';
import { cn } from '../../utils';

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
      (currentTarget as HTMLElement).style.transform = `translate3d(0, ${y}px, 0)`;
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
    <div className="grid h-screen w-screen place-items-center">
      <div className="grid h-[800px] max-w-sm place-items-center overflow-hidden rounded-xl border-2 border-solid border-slate-200">
        <img
          {...bind()}
          className={cn('w-full cursor-grab touch-none rounded-xl', dragging && 'cursor-grabbing')}
          src={src}
          width="380"
          height="570"
          alt="Lorem Picsum"
        />
      </div>
    </div>
  );
};
