import { ESLintReact } from "#/components/eslint-react";

import { Card, Cards } from "fumadocs-ui/components/card";

import { Link } from "next-view-transitions";

const features = [
  ["Modern", "First-class support for TypeScript, React 19, and more."],
  ["Flexible", "Increased flexibility with more granular severity control."],
  ["Performant", "Built with performance in mind, optimized for large codebases."],
  ["Comprehensive", "Handles complex scenarios and identifies problems that other tools might miss."],
] as const;

const plugins = [
  [
    "eslint-plugin-react-x",
    "Core rules (renderer-agnostic, compatible with x-platform).",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x",
  ],
  [
    "eslint-plugin-react-dom",
    "DOM specific rules for React DOM.",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom",
  ],
  [
    "eslint-plugin-react-web-api",
    "Rules for interacting with Web APIs.",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-web-api",
  ],
  [
    "eslint-plugin-react-hooks-extra",
    "Extra React Hooks rules.",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra",
  ],
  [
    "eslint-plugin-react-naming-convention",
    "Naming convention rules.",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention",
  ],
  [
    "@eslint-react/eslint-plugin",
    "Main plugin combining all rules and presets from the above packages.",
    "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin",
  ],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <p className="text-center">
          More than 80 high-quality linting rules to identify possible problems in your React 19 code.
        </p>
        <h2>Features</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {features.map(([title, description]) => <Card description={description} key={title} title={title} />)}
        </Cards>
        <h2>ESLint Plugins</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plugins.map(([title, description, href]) => (
            <Card description={description} href={href} key={title} title={title} />
          ))}
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
