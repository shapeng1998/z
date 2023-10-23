import ImageViewer from '@/components/ImageViewer';
import React from 'react';
import testImage from '@/assets/img.jpg';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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

export const ImagePage = () => {
  return (
    <Layout>
      <ImageContainer>
        <ImageViewer src={testImage} type="vanilla-react" />
        <Select>
          <SelectTrigger className="absolute left-1/2 w-[180px] -translate-x-1/2">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </ImageContainer>
    </Layout>
  );
};
