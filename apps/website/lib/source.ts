import { type InferMetaType, type InferPageType, loader, multiple } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "fumadocs-mdx:collections/server";

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
  }),
  {
    baseUrl: "/docs",
    plugins: [lucideIconsPlugin()],
  },
);

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
