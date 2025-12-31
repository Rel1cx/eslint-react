import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

/**
 * Represents various AST paths for React component function declarations.
 * Each tuple type represents a specific component definition pattern.
 */
export type FunctionInitPath =
  // Standard function declaration: function Comp() { return <div />; }
  | readonly [TSESTree.FunctionDeclaration]
  // Variable declarations: const Comp = () => <div />; or const Comp = function() { return <div />; }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTreeFunction,
  ]
  // Higher-order component patterns: const Comp = React.memo(() => <div />);
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Nested higher-order components: const Comp = React.memo(React.forwardRef(() => <div />));
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Object property components: const Comps = { TopNav() {}, SidePanel: () => <div /> }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTreeFunction,
  ]
  // HOC inside object property: const Comps = { TopNav: React.memo(() => <div />) }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Nested HOCs in object: const Comps = { TopNav: React.memo(React.forwardRef(() => <div />)) }
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  // Class method components: class Comp { TopNav() { return <div />; } }
  | readonly [
    TSESTree.ClassDeclaration,
    TSESTree.ClassBody,
    TSESTree.MethodDefinition,
    TSESTreeFunction,
  ]
  // Class property arrow functions: class Comp { TopNav = () => <div />; }
  | readonly [
    TSESTree.ClassDeclaration,
    TSESTree.ClassBody,
    TSESTree.PropertyDefinition,
    TSESTreeFunction,
  ];

/**
 * Identifies the initialization path of a function node in the AST.
 * Determines what kind of component declaration pattern the function belongs to.
 *
 * @param node The function node to analyze
 * @returns The function initialization path or unit if not identifiable
 */
export function getFunctionInitPath(node: TSESTreeFunction): unit | FunctionInitPath {
  // Function declaration is the simplest case
  if (node.type === T.FunctionDeclaration) {
    return [node] as const;
  }

  const { parent } = node;

  // Match against various component patterns
  switch (true) {
    // Basic variable declaration: const Comp = () => {}
    case parent.type === T.VariableDeclarator:
      return [parent.parent, parent, node] as const;

    // HOC pattern: const Comp = React.memo(() => {})
    case parent.type === T.CallExpression
      && parent.parent.type === T.VariableDeclarator:
      return [parent.parent.parent, parent.parent, parent, node] as const;

    // Nested HOC pattern: const Comp = React.memo(React.forwardRef(() => {}))
    case parent.type === T.CallExpression
      && parent.parent.type === T.CallExpression
      && parent.parent.parent.type === T.VariableDeclarator:
      return [parent.parent.parent.parent, parent.parent.parent, parent.parent, parent, node] as const;

    // Object property component: const Comps = { Nav: () => {} }
    case parent.type === T.Property
      && parent.parent.type === T.ObjectExpression
      && parent.parent.parent.type === T.VariableDeclarator:
      return [parent.parent.parent.parent, parent.parent.parent, parent.parent, parent, node] as const;

    // Class method component: class Comp { render() {} }
    case parent.type === T.MethodDefinition
      && parent.parent.parent.type === T.ClassDeclaration:
      return [parent.parent.parent, parent.parent, parent, node] as const;

    // Class property arrow function: class Comp { render = () => {} }
    case parent.type === T.PropertyDefinition
      && parent.parent.parent.type === T.ClassDeclaration:
      return [parent.parent.parent, parent.parent, parent, node] as const;
  }

  // Not a recognized function component initialization pattern
  return unit;
}

/**
 * Checks if a specific function call exists in the function initialization path.
 * Useful for detecting HOCs like React.memo, React.forwardRef, etc.
 *
 * @param callName The name of the call to check for (e.g., "memo", "forwardRef")
 * @param initPath The function initialization path to search in
 * @returns True if the call exists in the path, false otherwise
 */
export function hasCallInFunctionInitPath(callName: string, initPath: FunctionInitPath): boolean {
  return initPath.some((node) => {
    if (node.type !== T.CallExpression) {
      return false;
    }

    const { callee } = node;

    // Check direct function calls: memo(...)
    if (callee.type === T.Identifier) {
      return callee.name === callName;
    }

    // Check member expressions: React.memo(...)
    if (callee.type === T.MemberExpression && "name" in callee.property) {
      return callee.property.name === callName;
    }

    return false;
  });
}
