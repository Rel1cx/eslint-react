import { ESLintReact } from "#/components/ESLintReact";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Eye, Shield, Sliders, Zap } from "lucide-react";
import { Link } from "next-view-transitions";

const features = [
  [
    "Performant",
    "Built with performance in mind, optimized for large codebases.",
    Zap,
  ],
  [
    "Future-proof",
    "Forward-looking architecture that anticipates future changes in React and TypeScript.",
    Shield,
  ],
  [
    "Precision Control",
    "Fully customizable rule severity levels, allowing you to enforce or relax rules as needed.",
    Sliders,
  ],
  [
    "Context-aware Linting",
    "Rules that understand the context of your code and project configuration, providing more accurate linting results.",
    Eye,
  ],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <p className="text-center">
          A series of future-proof ESLint rules for React and friends.
        </p>
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
    </main>
  );
}
