import { getFunctionIdentifier, type TSESTreeFunction } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";

import { isValidReactHookName } from "./hook-name";

export function isReactHook(node: TSESTreeFunction) {
  return F.pipe(
    getFunctionIdentifier(node),
    O.flatMapNullable((id) => id.name),
    O.exists(isValidReactHookName),
  );
}
