import { F, O } from "@eslint-react/eff";
import type { CustomAttribute } from "@eslint-react/shared";

export function findAttrInCustomAttributes(
  name: string,
  attributes: CustomAttribute[],
) {
  return F.pipe(
    O.fromNullable(attributes.findLast((a) => a.as === name)),
    O.map((a) => [a.name, a.defaultValue] as const),
    O.getOrElse(() => [name] as const),
  );
}
