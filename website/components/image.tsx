import type { ImageProps } from "next/image";
import NextImage from "next/image";
import React from "react";

export function Image({ quality = 100, ...rest }: ImageProps) {
  return <NextImage quality={quality} {...rest} />;
}
