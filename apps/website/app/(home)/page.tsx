import { ESLintReact } from "#/components/ESLintReact";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CircleDotDashed, Gauge, Sliders, Zap } from "lucide-react";
import { Link } from "next-view-transitions";

const features = [
  ["Modern", "First-class support for TypeScript, React 19, and more.", Zap],
  ["Flexible", "Fully customizable rule severity levels, allowing you to enforce or relax rules as needed.", Sliders],
  [
    "Performant",
    "Built with performance in mind, optimized for large codebases, 4-7x faster than other ESLint plugins.",
    Gauge,
  ],
  [
    "Context-aware Linting",
    "Rules that understand the context of your code and project configuration to provide more accurate linting.",
    CircleDotDashed,
  ],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-0 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <h2>Features</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, description, Icon]) => (
            <Card
              description={description}
              icon={<Icon />}
              key={title}
              title={title}
            />
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
      <footer className="text-center text-sm text-gray-500 mt-8">
        <small>
          ESLint React is not affiliated with Meta Corporation or{" "}
          <Link className="underline" href="https://github.com/facebook/react">facebook/react</Link>{" "}
          project or team, nor is it endorsed or sponsored by them.
        </small>
      </footer>
    </main>
  );
}
