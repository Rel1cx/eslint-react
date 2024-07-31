import { birecord } from "@eslint-react/tools";
import ts from "typescript";

// Ported from: https://github.com/JoshuaKGoldberg/TypeStat/blob/580367ad027ae2a5295b050f8bf11cfbd7c97539/src/mutations/collecting/flags.ts#L5
export const tsKnownTypeFlagEquivalents = birecord({
  [ts.TypeFlags.BigInt]: ts.TypeFlags.BigIntLiteral,
  [ts.TypeFlags.Boolean]: ts.TypeFlags.BooleanLiteral,
  [ts.TypeFlags.Number]: ts.TypeFlags.NumberLiteral,
  [ts.TypeFlags.String]: ts.TypeFlags.StringLiteral,
  [ts.TypeFlags.Undefined]: ts.TypeFlags.Void,
});
