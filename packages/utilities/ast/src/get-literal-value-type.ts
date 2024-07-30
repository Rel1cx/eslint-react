import { match, P } from "ts-pattern";

export function getLiteralValueType(input: bigint | boolean | null | number | string | symbol) {
  return match(input)
    .with(null, () => "Null" as const)
    .with(P.boolean, () => "Boolean" as const)
    .with(P.number, () => "Number" as const)
    .with(P.string, () => "String" as const)
    .with(P.bigint, () => "BigInt" as const)
    .with(P.symbol, () => "Symbol" as const)
    .exhaustive();
}
