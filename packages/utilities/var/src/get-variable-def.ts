import { F, O } from "@eslint-react/tools";
import type { Definition, Variable } from "@typescript-eslint/scope-manager";

/**
 * Get the init node of the nth definition of a variable
 * @param at The index number of def in defs
 * @returns A function that takes a variable and returns the init node of the nth definition of that variable
 */
export function getVariableDef(at: number) {
  return (variable: Variable): O.Option<Definition> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
    );
  };
}
