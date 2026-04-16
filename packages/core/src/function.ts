import { Check } from "@eslint-react/ast";
import type { TSESTreeDirective, TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import type { SemanticFunc } from "./semantic";

/**
 * Type representing the return type of `getFunctionId`.
 */
export type FunctionID = ReturnType<typeof getFunctionId>;

/**
 * Represents various AST paths for function declarations.
 * Each tuple type represents a specific function definition pattern.
 */
export type FunctionInitPath =
  // Standard function declaration: function Component() { return <div />; }
  | readonly [TSESTree.FunctionDeclaration]
  // Variable declarations: const Component = () => <div />; or const Component = function() { return <div />; }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTreeFunction,
  ]
  // Higher-order component patterns: const Component = React.memo(() => <div />);
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Nested higher-order components: const Component = React.memo(React.forwardRef(() => <div />));
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Object property components: const Components = { Nav() {}, SidePanel: () => <div /> }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTreeFunction,
  ]
  // HOC inside object property: const Components = { Nav: React.memo(() => <div />) }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Nested HOCs in object: const Components = { Nav: React.memo(React.forwardRef(() => <div />)) }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Class method components: class Component { Nav() { return <div />; } } or const Component = class { Nav() {} }
  | readonly [
    TSESTree.ClassDeclaration | TSESTree.ClassExpression,
    TSESTree.ClassBody,
    TSESTree.MethodDefinition,
    TSESTreeFunction,
  ]
  // Class property arrow functions: class Component { Nav = () => <div />; } or const Component = class { Nav = () => {} }
  | readonly [
    TSESTree.ClassDeclaration | TSESTree.ClassExpression,
    TSESTree.ClassBody,
    TSESTree.PropertyDefinition,
    TSESTreeFunction,
  ];

/**
 * Represents the kind of a function.
 */
export type FunctionKind =
  | "client-function"
  | "server-function";

/**
 * Represents a client function semantic node.
 */
export interface ClientFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function.
   */
  kind: "client-function";
}

/**
 * Represents a server function semantic node.
 */
export interface ServerFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function.
   */
  kind: "server-function";
}

/**
 * Represents a function semantic node.
 */
export type FunctionSemanticNode = ClientFunctionSemanticNode | ServerFunctionSemanticNode;

/**
 * Gets the static identifier of a function AST node.
 *
 * @remarks
 * For function declarations this is straightforward. For anonymous function
 * expressions it is more complex. This function roughly detects the same AST
 * nodes as the ECMAScript spec's `IsAnonymousFunctionDefinition()` with some
 * exceptions to better fit our use case.
 *
 * Ported from {@link https://github.com/facebook/react/blob/bb8a76c6cc77ea2976d690ea09f5a1b3d9b1792a/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L860 | RulesOfHooks.ts}
 *
 * @param node - The function node to analyze.
 * @returns The identifier node if found, `null` otherwise.
 */
export function getFunctionId(node: TSESTree.Expression | TSESTreeFunction) {
  switch (true) {
    // function MaybeComponent() {}
    case "id" in node
      && node.id != null:
      // const whatever = function MaybeComponent() {};
      return node.id;
    case node.parent.type === AST.VariableDeclarator
      && node.parent.init === node:
      return node.parent.id;
    // MaybeComponent = () => {};
    case node.parent.type === AST.AssignmentExpression
      && node.parent.right === node
      && node.parent.operator === "=":
      return node.parent.left;
    // {MaybeComponent: () => {}}
    // {MaybeComponent() {}}
    case node.parent.type === AST.Property
      && node.parent.value === node
      && !node.parent.computed:
      return node.parent.key;
    // class {MaybeComponent = () => {}}
    // class {MaybeComponent() {}}
    case Check.isMethodOrProperty(node.parent)
      && node.parent.value === node:
      return node.parent.key;
      // Follow spec convention for `IsAnonymousFunctionDefinition()` usage.
      //
      // const {MaybeComponent = () => {}} = {};
      // ({MaybeComponent = () => {}} = {});
    case node.parent.type === AST.AssignmentPattern
      && node.parent.right === node:
      return node.parent.left;
    // const MaybeComponent = condition ? () => {} : () => {};
    case node.parent.type === AST.ConditionalExpression:
      return getFunctionId(node.parent);
    // const MaybeComponent = (() => {})!;
    // const MaybeComponent = (() => {}) as FunctionComponent;
    // const MaybeComponent = (() => {}) satisfies FunctionComponent;
    case Check.isTypeAssertionExpression(node.parent):
      return getFunctionId(node.parent);
  }
  return null;
}

/**
 * Identifies the initialization path of a function node in the AST.
 *
 * @param node - The function node to analyze.
 * @returns The function initialization path or `null` if not identifiable.
 */
export function getFunctionInitPath(node: TSESTreeFunction): null | FunctionInitPath {
  // Function declaration is the simplest case
  if (node.type === AST.FunctionDeclaration) {
    return [node] as const;
  }

  // Traverse up through type expressions (as, satisfies, !, etc.) to find the semantic parent
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;

  // Match against various component patterns
  switch (true) {
    // Basic variable declaration: const Component = () => {}
    case parent.type === AST.VariableDeclarator:
      return [parent.parent, parent, node] as const;

    // HOC pattern: const Component = React.memo(() => {})
    case parent.type === AST.CallExpression
      && parent.parent.type === AST.VariableDeclarator:
      return [parent.parent.parent, parent.parent, parent, node] as const;

    // Nested HOC pattern: const Component = React.memo(React.forwardRef(() => {}))
    case parent.type === AST.CallExpression
      && parent.parent.type === AST.CallExpression
      && parent.parent.parent.type === AST.VariableDeclarator:
      return [parent.parent.parent.parent, parent.parent.parent, parent.parent, parent, node] as const;

    // Object property component: const Components = { Nav: () => {} }
    case parent.type === AST.Property
      && parent.parent.type === AST.ObjectExpression
      && parent.parent.parent.type === AST.VariableDeclarator:
      return [parent.parent.parent.parent, parent.parent.parent, parent.parent, parent, node] as const;

    // Class method component: class Component { Nav() {} } or const Component = class { Nav() {} }
    case parent.type === AST.MethodDefinition:
      return [parent.parent.parent, parent.parent, parent, node] as const;

    // Class property arrow function: class Component { Nav = () => {} } or const Component = class { Nav = () => {} }
    case parent.type === AST.PropertyDefinition:
      return [parent.parent.parent, parent.parent, parent, node] as const;
  }

  // Not a recognized function component initialization pattern
  return null;
}

/**
 * Checks if a specific function call exists in the function initialization path.
 *
 * @param callName - The name of the call to check for (e.g., "memo", "forwardRef").
 * @param initPath - The function initialization path to search in.
 * @returns `true` if the call exists in the path, `false` otherwise.
 */
export function isFunctionHasCallInInitPath(callName: string, initPath: FunctionInitPath): boolean {
  return initPath.some((node) => {
    if (node.type !== AST.CallExpression) {
      return false;
    }

    const { callee } = node;

    // Check direct function calls: memo(...)
    if (callee.type === AST.Identifier) {
      return callee.name === callName;
    }

    // Check member expressions: React.memo(...)
    if (callee.type === AST.MemberExpression && "name" in callee.property) {
      return callee.property.name === callName;
    }

    return false;
  });
}

/**
 * Checks if a function is empty.
 *
 * @param node - The function node to check.
 * @returns `true` if the function is empty, `false` otherwise.
 */
export function isFunctionEmpty(node: TSESTreeFunction) {
  return node.body.type === AST.BlockStatement
    && node.body.body.length === 0;
}

export function getFunctionDirectives(node: TSESTreeFunction): TSESTreeDirective[] {
  const directives: TSESTreeDirective[] = [];
  if (node.body.type !== AST.BlockStatement) return directives;
  function isDirective(node: TSESTree.Statement): node is TSESTreeDirective {
    return node.type === AST.ExpressionStatement && node.directive != null;
  }
  for (const stmt of node.body.body) {
    if (!isDirective(stmt)) continue;
    directives.push(stmt);
  }
  return directives;
}

/**
 * Checks if a directive with the given name exists in the function directives.
 *
 * @param node - The function AST node.
 * @param name - The directive name to check (e.g., "use memo", "use no memo").
 * @returns `true` if the directive exists, `false` otherwise.
 */
export function isFunctionHasDirective(node: TSESTreeFunction, name: string): boolean {
  return getFunctionDirectives(node).some((d) => d.directive === name);
}

export type FunctionDisplayNameAssignment = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & { name: "displayName" };
  };
  operator: "=";
  right: TSESTree.Literal;
};

export const SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT = [
  "AssignmentExpression",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
