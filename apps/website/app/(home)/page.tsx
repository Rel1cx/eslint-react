import { Card, Cards } from "fumadocs-ui/components/card";
import { Link } from "next-view-transitions";

import { ESLintReact } from "#/components/eslint-react";

const features = [
  ["Modern", "First-class support for TypeScript, React 19, polymorphic components."],
  ["Flexible", "Increased flexibility with more granular severity control."],
  ["Performant", "Built with performance in mind, optimized for large codebases."],
  ["Comprehensive", "Handles complex scenarios and identifies problems that other tools might miss."],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <p className="text-center">More than 80 high-quality linting rules for writing better React code.</p>
        <h2>Features</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {features.map(([title, description]) => <Card description={description} key={title} title={title} />)}
        </Cards>
        <h2>Roadmap</h2>
        <p>
          Check out the <Link href="/roadmap">roadmap</Link> to see what's planned for the future.
        </p>
        <h2>Contributing</h2>
        <p>
          Want to contribute? Check out the{" "}
          <Link href="https://github.com/Rel1cx/eslint-react/blob/main/.github/CONTRIBUTING.md">
            contributing guide
          </Link>.
        </p>
      </article>
    </main>
  );
}
