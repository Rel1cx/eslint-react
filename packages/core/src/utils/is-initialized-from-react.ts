import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";

export function isInitializedFromReact(
  name: string,
  importSource: string,
  initialScope: Scope,
) {
  return name.toLowerCase() === "react"
    || VAR.isInitializedFromSource(
      name,
      importSource,
      initialScope,
    );
}
