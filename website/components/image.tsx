import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";

type ImageProps = NextImageProps;

export function Image({ alt, quality = 100, src, ...rest }: ImageProps) {
  return <NextImage alt={alt} quality={quality} src={src} {...rest} />;
}
