import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";
import { Function as F, Option as O } from "effect";

import { getVariables } from "./get-variable";

export const findVariable: {
  (initialScope: Scope): (name: string) => O.Option<Variable>;
  (name: string, initialScope: Scope): O.Option<Variable>;
} = F.dual(2, (name: string, initialScope: Scope) => {
  return O.fromNullable(
    getVariables(initialScope)
      .find((variable) => variable.name === name),
  );
});
