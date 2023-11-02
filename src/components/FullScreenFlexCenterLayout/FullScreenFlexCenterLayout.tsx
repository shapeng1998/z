import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FullScreenFlexCenterLayoutProps {
  className?: string;
  children?: ReactNode;
}

const FullScreenFlexCenterLayout = ({ children, className }: FullScreenFlexCenterLayoutProps) => {
  return <div className={cn('flex h-screen w-screen flex-col items-center justify-center', className)}>{children}</div>;
};

export default FullScreenFlexCenterLayout;
