import { ImageViewerProps } from './ImageViewer'

export const ImageViewerWithVanillaReact = ({
  src,
}: Omit<ImageViewerProps, 'type'>) => {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <img
        className="w-full touch-none rounded-xl"
        src={src}
        alt="Lorem Picsum"
      />
    </div>
  )
}
