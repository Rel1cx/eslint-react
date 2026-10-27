import { type TSESTreeClass, type TSESTreeMethodOrPropertyDefinition } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

// A set of class members (lifecycle methods and other implicitly-used members like `constructor`, `render`, `state`) that should not be flagged as unused
export const LIFECYCLE_METHODS = new Set([
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUnmount",
  "componentWillUpdate",
  "constructor",
  "getSnapshotBeforeUpdate",
  "render",
  "shouldComponentUpdate",
  "state",
  "UNSAFE_componentWillMount",
  "UNSAFE_componentWillReceiveProps",
  "UNSAFE_componentWillUpdate",
]);

// A set of method names that host environments invoke through refs (e.g. React Native's `NativeMethods`
// interface) without any statically visible usage, so they should not be flagged as unused
export const KNOWN_HOST_CONVENTION_METHODS = new Set([
  "blur",
  "focus",
  "measure",
  "measureInWindow",
  "measureLayout",
  "setNativeProps",
]);

// Checks if a class component is exported from its module. Public methods of an exported class
// component may be part of its imperative API invoked by consumers through refs
// (ex: `drawerRef.current.openDrawer()`), with no statically visible usage inside the class
export function isExportedClass(node: TSESTreeClass) {
  switch (node.parent.type) {
    // export default class ... / export class ...
    case AST.ExportDefaultDeclaration:
    case AST.ExportNamedDeclaration:
      return true;
    // export const X = class ...
    case AST.VariableDeclarator:
      return node.parent.parent.parent.type === AST.ExportNamedDeclaration;
    default:
      return false;
  }
}

// Checks if a class member definition is a public method: a method or a function-valued
// property without a `private` or `protected` modifier. Definitions collected from
// `this.x = ...` assignments are data fields and are not passed to this helper
export function isPublicMethod(member: TSESTreeMethodOrPropertyDefinition): boolean {
  switch (member.type) {
    case AST.MethodDefinition:
      return member.accessibility == null || member.accessibility === "public";
    case AST.PropertyDefinition:
      return (member.accessibility == null || member.accessibility === "public")
        && (member.value?.type === AST.ArrowFunctionExpression || member.value?.type === AST.FunctionExpression);
    default:
      return false;
  }
}
