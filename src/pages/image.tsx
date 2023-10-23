import React, { useCallback, useState } from 'react';
import testImage from '@/assets/img.jpg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageViewer, { ImageViewerComponentMap, ImageViewerProps } from '@/components/ImageViewer';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <div className="grid h-screen w-screen place-items-center">{children}</div>;
};

const ImageContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="grid h-[800px] max-w-sm place-items-center overflow-hidden rounded-xl border-2 border-solid border-slate-200">
      {children}
    </div>
  );
};

const ImageViewerComponentType = Object.keys(ImageViewerComponentMap);

export const ImagePage = () => {
  const [type, setType] = useState<ImageViewerProps['type']>('vanilla-react');

  const handleTypeValueChange = useCallback((value: ImageViewerProps['type']) => {
    setType(value);
  }, []);

  return (
    <Layout>
      <ImageContainer>
        <ImageViewer src={testImage} type={type} />
      </ImageContainer>
      <Select onValueChange={handleTypeValueChange}>
        <SelectTrigger className="absolute bottom-24 left-1/2 w-[180px] -translate-x-1/2">
          <SelectValue defaultValue={type} placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {ImageViewerComponentType.map((value) => (
            <SelectItem value={value}>{value}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Layout>
  );
};
