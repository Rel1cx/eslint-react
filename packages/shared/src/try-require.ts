import module from "node:module";

import { E } from "@eslint-react/tools";

export function tryRequire(id: string, at = import.meta.url): E.Either<unknown, Error> {
  const _require = module.createRequire(at);
  try {
    return E.right(_require(id));
  } catch {
    return E.left(new Error(`Module '${id}' not found`));
  }
}
