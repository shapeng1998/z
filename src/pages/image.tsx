import { type ReactNode, useCallback, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageViewer, { type ImageViewerProps } from '@/components/ImageViewer';
import FullScreenFlexCenterLayout from '@/components/FullScreenFlexCenterLayout';
import testImage from '@/assets/test.webp';

const ImageContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="grid h-[600px] w-96 place-items-center overflow-hidden rounded-xl border border-solid border-slate-200">
      {children}
    </div>
  );
};

export const ImagePage = () => {
  const [type, setType] = useState<ImageViewerProps['type']>('vanilla-react');

  const handleTypeValueChange = useCallback((value: ImageViewerProps['type']) => {
    setType(value);
  }, []);

  return (
    <FullScreenFlexCenterLayout className="gap-2">
      {/* Draggable image */}
      <ImageContainer>
        <ImageViewer src={testImage} type={type} />
      </ImageContainer>

      {/* Select which framework type */}
      <Select onValueChange={handleTypeValueChange} defaultValue={type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {['vanilla-react', 'use-gesture', 'framer-motion'].map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FullScreenFlexCenterLayout>
  );
};
