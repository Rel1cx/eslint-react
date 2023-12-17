import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";

export interface ImageProps extends NextImageProps {}

export function Image({ alt, quality = 100, src, ...rest }: ImageProps) {
  return <NextImage alt={alt} quality={quality} src={src} {...rest} />;
}
