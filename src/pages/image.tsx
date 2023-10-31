import React, { useCallback, useState } from 'react';
import testImage from '@/assets/test.webp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageViewer, { ImageViewerProps } from '@/components/ImageViewer';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex h-screen w-screen flex-col items-center justify-center">{children}</div>;
};

const ImageContainer = ({ children }: { children?: React.ReactNode }) => {
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
    <Layout>
      <ImageContainer>
        <ImageViewer src={testImage} type={type} />
      </ImageContainer>
      <Select onValueChange={handleTypeValueChange} defaultValue={type}>
        <SelectTrigger className="mt-2 w-[180px]">
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
    </Layout>
  );
};
