import logo from "#/assets/logo.svg";
import { baseOptions } from "#/lib/layout.shared";
import { source } from "#/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import Image from "next/image";

export default function Layout({ children }: LayoutProps<"/docs">) {
  const base = baseOptions();
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      nav={{
        ...base.nav,
        title: (
          <div className="flex items-between gap-2.5 min-w-max">
            <Image
              alt="logo"
              height="20"
              quality={100}
              src={logo}
              width="20"
            />
            <span>ESLint React</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
