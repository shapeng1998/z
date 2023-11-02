import { useCallback, useState, type ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageViewer, { type ImageViewerProps } from '@/components/ImageViewer';
import testImage from '@/assets/test.webp';

const Layout = ({ children }: { children?: ReactNode }) => {
  return <div className="flex h-screen w-screen flex-col items-center justify-center">{children}</div>;
};

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
