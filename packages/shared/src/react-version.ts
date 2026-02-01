import module from "node:module";
import path from "node:path";

import { identity } from "@eslint-react/eff";
import { P, match } from "ts-pattern";

const _require = module.createRequire(process.cwd() + path.sep);

/**
 * Gets the React version from the project's dependencies.
 * @param fallback The fallback version to return if React is not found.
 * @returns The detected React version or the fallback version.
 */
export function getReactVersion(fallback: string): string {
  try {
    return match(_require("react"))
      .with({ version: P.select(P.string) }, identity)
      .otherwise(() => fallback);
  } catch {
    return fallback;
  }
}
