import { E, F } from "@eslint-react/tools";
import { isMatching, P } from "ts-pattern";

import { tryRequire } from "./try-require";

export function getReactVersion(at = import.meta.url): E.Either<string, unknown> {
  return F.pipe(
    tryRequire("react", at),
    E.filterOrLeft(isMatching({ version: P.string }), F.identity),
    E.map((mod) => mod.version),
  );
}
