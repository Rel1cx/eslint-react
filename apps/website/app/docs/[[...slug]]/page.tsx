import { source } from "#/lib/source";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";

import { notFound } from "next/navigation";

const mdxComponents = {
  ...defaultMdxComponents,
  Popup,
  PopupContent,
  PopupTrigger,
  Tab,
  Tabs,
};

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (page == null) notFound();
  const {
    description,
    title,
    body: MDX,
    full = false,
    toc,
  } = page.data;

  return (
    <DocsPage full={full} toc={toc}>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (page == null) notFound();
  const { description, title } = page.data;

  return {
    description,
    title,
  };
}
