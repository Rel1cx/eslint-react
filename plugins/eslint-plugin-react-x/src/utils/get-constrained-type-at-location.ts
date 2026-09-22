import type { TSESTree } from "@typescript-eslint/types";
import type { ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import type ts from "typescript";

export function getConstrainedTypeAtLocation(services: ParserServicesWithTypeInformation, node: TSESTree.Node): ts.Type {
  const type = services.getTypeAtLocation(node);
  return services.program.getTypeChecker().getBaseConstraintOfType(type) ?? type;
}
