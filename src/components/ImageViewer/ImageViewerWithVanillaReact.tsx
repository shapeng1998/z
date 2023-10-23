import { useState, useRef, type PointerEventHandler, useCallback } from 'react';

import { ImageViewerProps } from './ImageViewer';
import { cn } from '@/lib/utils';

export interface Point {
  x: number;
  y: number;
}

type Axis = 'x' | 'y' | null;

function getCurrentAxis(offset: Point, threshold = 10): Axis {
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

export const ImageViewerWithVanillaReact = ({ src }: Omit<ImageViewerProps, 'type'>) => {
  const [dragging, setDragging] = useState(false);

  /** Position offset when not dragging */
  const posRef = useRef<Point>({ x: 0, y: 0 });

  /** Position offset when dragging */
  const offsetRef = useRef<Point>({ x: 0, y: 0 });

  /** Initial dragging coordinates */
  const initialRef = useRef<Point>({ x: 0, y: 0 });

  /** Current dragging axis */
  const axisRef = useRef<Axis>(null);

  /** Current dragging event's `pointerId` */
  const pointerIdRef = useRef<number | null>(null);

  const start = useCallback<PointerEventHandler>((e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerIdRef.current = e.pointerId;
    initialRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const move = useCallback<PointerEventHandler>(
    (e) => {
      if (e.pointerId !== pointerIdRef.current) {
        return;
      }

      const offset: Point = {
        x: e.clientX - initialRef.current.x,
        y: e.clientY - initialRef.current.y,
      };
      if (!axisRef.current) {
        axisRef.current = getCurrentAxis(offset);
      }
      if (axisRef.current !== 'y') {
        return;
      }

      if (!dragging) {
        setDragging(true);
      }

      const y = offset.y + posRef.current.y;
      (e.currentTarget as HTMLElement).style.transform = `translate3d(0, ${y}px, 0)`;

      offsetRef.current = offset;
    },
    [dragging],
  );

  const end = useCallback<PointerEventHandler>(() => {
    setDragging(false);
    initialRef.current = { x: 0, y: 0 };
    posRef.current.y += offsetRef.current.y;
    offsetRef.current = { x: 0, y: 0 };
    axisRef.current = null;
    pointerIdRef.current = null;
  }, []);

  return (
    <img
      className={cn('w-full cursor-grab touch-none rounded-xl', dragging && 'cursor-grabbing')}
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
