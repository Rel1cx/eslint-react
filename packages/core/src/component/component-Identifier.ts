/* eslint-disable filenames-simple/naming-convention */
import { type TSESTreeFunction } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getComponentIdentifier(node: TSESTreeFunction): O.Option<TSESTree.Identifier> {
  // TODO: implement this

  return O.none();
}
