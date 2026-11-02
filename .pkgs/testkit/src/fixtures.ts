/// <reference types="node" />
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export function getFixturesRootDir(): string {
  return path.join(here, "..", "..", "..", "testing", "samples");
}

/**
 * Resolve a named fixture file under the fixtures root directory.
 * The file's name drives parser inference (e.g. a `.ts` name disables JSX);
 * its content is irrelevant and never read.
 * @param name The fixture file name, e.g. `"file.ts"` or `"estree.tsx"`
 * @returns The absolute path to the fixture file
 */
export function fixturePath(name: string): string {
  return path.join(getFixturesRootDir(), name);
}

/**
 * Registry of the tsconfig fixtures under the fixtures root directory,
 * keyed by the scenario they model. Adding a new scenario is a matter of
 * dropping a tsconfig file into the fixtures root and adding one entry here.
 */
export const tsconfigFixtures = {
  /** Automatic JSX runtime with `jsxImportSource: preact`. */
  preact: "tsconfig.jsx-preact.json",
  /** Preserved JSX (`jsx: preserve`). */
  preserve: "tsconfig.jsx-preserve.json",
  /** Classic JSX runtime (`jsx: react`). */
  "react-classic": "tsconfig.jsx-react.json",
  /** Default automatic JSX runtime (`jsx: react-jsx`). */
  "react-jsx": "tsconfig.json",
  /** React Native JSX transform (`jsx: react-native`). */
  "react-native": "tsconfig.jsx-react-native.json",
} as const;

export type TsconfigFixtureName = keyof typeof tsconfigFixtures;

/**
 * Resolve the absolute path of a registered tsconfig fixture.
 */
export function tsconfigFixturePath(name: TsconfigFixtureName): string {
  return fixturePath(tsconfigFixtures[name]);
}
