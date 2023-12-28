import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import React from "react";

export const Image = React.memo(
  React.forwardRef<HTMLImageElement, NextImageProps>(function Image({ alt, quality = 100, src, ...rest }, ref) {
    return <NextImage ref={ref} alt={alt} quality={quality} src={src} {...rest} />;
  }),
);
