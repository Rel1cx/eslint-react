import { _, identity } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import { match, P } from "ts-pattern";

export function toResolvedAttributeValue(
  name: string,
  value: VAR.StaticValue,
) {
  return match(VAR.toResolved(value).value)
    .with(P.string, identity)
    .with({ [name]: P.select(P.string) }, identity)
    .otherwise(() => _);
}
