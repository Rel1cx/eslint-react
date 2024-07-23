import type { CustomAttribute } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";

export const getPropFromPreDefined = (name: string, additionalAttributes: CustomAttribute[]) => {
  return F.pipe(
    O.fromNullable(additionalAttributes.findLast(a => a.as === name)),
    O.map(a => [a.name, a.defaultValue] as const),
    O.getOrElse(() => [name] as const),
  );
};
