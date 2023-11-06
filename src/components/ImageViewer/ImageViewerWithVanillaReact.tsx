import { type PointerEventHandler, useCallback, useRef, useState } from 'react';

import { type ImageViewerProps } from './ImageViewer';
import { AXIS_THRESHOLD } from './ImageViewer.constants';
import { cn } from '@/lib/utils';

export interface Point {
  x: number;
  y: number;
}

type Axis = 'x' | 'y' | null;

interface PointerState {
  /** Current dragging event's `pointerId` */
  pointerId: number | null;
  /** Current dragging axis */
  axis: Axis;
  /** Initial dragging coordinates */
  initial: Point;
  /** Position offset when dragging */
  offset: Point;
  /** Position offset when not dragging */
  pos: Point;
}

function getCurrentAxis(offset: Point, threshold = AXIS_THRESHOLD): Axis {
  const absDx = Math.abs(offset.x);
  const absDy = Math.abs(offset.y);

  if (absDx > absDy && absDx > threshold) {
    return 'x';
  }
  if (absDy > absDx && absDy > threshold) {
    return 'y';
  }
  return null;
}

function createPoint(x = 0, y = 0): Point {
  return { x, y };
}

function createDefaultPointerState(): PointerState {
  return {
    pointerId: null,
    axis: null,
    initial: createPoint(),
    offset: createPoint(),
    pos: createPoint(),
  };
}

export const ImageViewerWithVanillaReact = ({ src }: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false);
  const pointerStateRef = useRef<PointerState>(createDefaultPointerState());

  const start = useCallback<PointerEventHandler>((e) => {
    // Initialize pointer event
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    // Initialize pointer state
    const pointerState = pointerStateRef.current;
    pointerState.pointerId = e.pointerId;
    pointerState.initial = createPoint(e.clientX, e.clientY);
  }, []);

  const move = useCallback<PointerEventHandler>(
    (e) => {
      const pointerState = pointerStateRef.current;
      const { pointerId: currentPointerId, initial, axis: currentAxis, pos } = pointerState;

      // Return when wrong pointerId
      if (e.pointerId !== currentPointerId) {
        return;
      }

      // Compute offset value based on initial coordinates
      const offset = createPoint(e.clientX - initial.x, e.clientY - initial.y);
      // Initialize current axis value
      if (currentAxis === null) {
        pointerState.axis = getCurrentAxis(offset);
      }
      // Disable x direction
      if (pointerState.axis !== 'y') {
        return;
      }

      // Update dragging state
      if (dragging === false) {
        setDragging(true);
      }

      // Update translateY
      (e.currentTarget as HTMLElement).style.transform = `translateY(${offset.y + pos.y}px)`;
      // Update offset state
      pointerState.offset = offset;
    },
    [dragging],
  );

  const end = useCallback<PointerEventHandler>(() => {
    // Reset dragging state
    setDragging(false);

    const { pos, offset } = pointerStateRef.current;
    pointerStateRef.current = {
      // Reset pointer state
      ...createDefaultPointerState(),
      // Update position state
      pos: createPoint(pos.x, pos.y + offset.y),
    };
  }, []);

  return (
    <img
      className={cn(
        'h-auto w-full cursor-grab touch-none rounded-xl will-change-transform',
        dragging && 'cursor-grabbing',
      )}
      src={src}
      width="380"
      height="570"
      alt="Lorem Picsum"
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
    />
  );
};
