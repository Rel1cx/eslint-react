import { source } from "#/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "../layout.config";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.getPageTree()}
    >
      {children}
    </DocsLayout>
  );
}
