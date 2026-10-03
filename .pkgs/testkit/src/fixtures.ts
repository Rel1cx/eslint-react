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
