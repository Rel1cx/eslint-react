import { EffectLayer } from "#/components/EffectLayer";
import { ESLintReact } from "#/components/ESLintReact";
import { Card, Cards } from "fumadocs-ui/components/card";
import { CircleDotDashed, Gauge, Sliders, Zap } from "lucide-react";
import { Link } from "next-view-transitions";

const features = [
  ["Modern", "First-class support for TypeScript, React 19, and more.", Zap],
  ["Flexible", "Fully customizable rule severity levels, allowing you to enforce or relax rules as needed.", Sliders],
  ["Performant", "Built with performance in mind, optimized for large codebases.", Gauge],
  [
    "Context-aware Linting",
    "Rules that understand the context of your code and project configuration to provide more accurate linting.",
    CircleDotDashed,
  ],
] as const;

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <EffectLayer />
      <ESLintReact />
      <article className="prose max-w-none">
        <h2 className="isolate">Features</h2>
        <Cards className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, description, Icon]) => (
            <Card
              className="mix-blend-luminosity"
              description={description}
              icon={<Icon />}
              key={title}
              title={title}
            />
          ))}
        </Cards>
        <h2 className="isolate">Roadmap</h2>
        <p>
          Check out the <Link href="/roadmap">roadmap</Link> to see what's planned for the future.
        </p>
        <h2 className="isolate">Contributing</h2>
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
