import module from "node:module";

import { identity } from "@eslint-react/eff";
import { match, P } from "ts-pattern";

const _require = module.createRequire(import.meta.url);

export function getReactVersion(fallback = "19.0.0"): string {
  try {
    return match(_require("react"))
      .with({ version: P.select(P.string) }, identity)
      .otherwise(() => fallback);
  } catch {
    return fallback;
  }
}
