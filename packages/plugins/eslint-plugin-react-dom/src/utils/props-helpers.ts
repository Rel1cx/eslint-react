import type { CustomAttribute } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";

export const getPropFromUserDefined = (name: string, attributes: CustomAttribute[]) => {
  return F.pipe(
    O.fromNullable(attributes.findLast(a => a.as === name)),
    O.map(a => [a.name, a.defaultValue] as const),
    O.getOrElse(() => [name] as const),
  );
};
