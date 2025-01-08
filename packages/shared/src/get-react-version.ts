import module from "node:module";

import { F } from "@eslint-react/eff";
import { match, P } from "ts-pattern";

const _require = module.createRequire(import.meta.url);

export function getReactVersion(fallback = "19.0.0"): string {
  try {
    return match(_require("react"))
      .with({ version: P.select(P.string) }, F.identity)
      .otherwise(F.constant(fallback));
  } catch {
    return fallback;
  }
}
