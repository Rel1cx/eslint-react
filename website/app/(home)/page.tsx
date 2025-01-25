import { ESLintReact } from "#/components/eslint-react";
import { TweetCards } from "#/components/tweet-cards";
import { Link } from "next-view-transitions";

const features = [
  ["Flexible", "Increased flexibility with more granular severity control."],
  ["Comprehensive", "First-class support for TypeScript, React 19, polymorphic components."],
  ["Advanced Analysis", "Handles complex scenarios and identifies problems that other tools might miss."],
] as const;

const packages = [
  ["eslint-plugin-react-x", "Core rules (renderer-agnostic, compatible with x-platform)."],
  ["eslint-plugin-react-dom", "DOM specific rules for React DOM."],
  ["eslint-plugin-react-web-api", "Rules for interacting with Web APIs."],
  ["eslint-plugin-react-hooks-extra", "Extra React Hooks rules."],
  ["eslint-plugin-react-naming-convention", "Naming convention rules."],
] as const;

const tweets = [
  "1865166494709026873",
  "1839913920984678890",
  "1841248980354941038",
  "1859137094976696467",
];

export default function HomePage() {
  return (
    <main className="w-full min-w-0 max-w-6xl px-8 pt-4 pb-12 md:px-12 mx-auto">
      <ESLintReact />
      <article className="prose max-w-none">
        <p>Welcome to the ESLint React documentation.</p>
        <p>A set of composable ESLint rules for libraries and frameworks that use React as a UI runtime.</p>
        <h2>Features</h2>
        <ul>
          {features.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>: {description}
            </li>
          ))}
        </ul>
        <h2>Public packages</h2>
        <h3>All-in-one plugins</h3>
        <ul>
          <li>
            <span>
              <Link href="https://www.npmjs.com/package/@eslint-react/eslint-plugin">
                @eslint-react/eslint-plugin
              </Link>{" "}
              - The main ESLint plugin package including all rules and config presets in this repository.
            </span>
          </li>
        </ul>
        <h3>Modular plugins</h3>
        <ul>
          {packages.map(([name, description]) => (
            <li key={name}>
              <span>
                <Link href={`https://www.npmjs.com/package/${name}`}>
                  {name}
                </Link>{" "}
                - {description}
              </span>
            </li>
          ))}
        </ul>
        <TweetCards
          className="not-prose"
          tweets={tweets}
        />
        <h2>FAQ</h2>
        <Link href="/docs/faq">Frequently Asked Questions ↗</Link>
        <h2>License</h2>
        This project is licensed under the MIT License - see the{" "}
        <a href="https://github.com/Rel1cx/eslint-react/blob/main/LICENSE">LICENSE</a> file for details.
      </article>
    </main>
  );
}
