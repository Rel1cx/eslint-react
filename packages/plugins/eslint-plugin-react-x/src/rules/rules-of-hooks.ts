import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "rules-of-hooks";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID =
  | "conditionalHook"
  | "loopHook"
  | "nestedHook"
  | "afterEarlyReturn"
  | "asyncHook"
  | "classHook"
  | "topLevelHook"
  | "useInTryCatch"
  | "invalidContext";

type FunctionEntryKind = "component" | "hook" | "other";

interface FunctionEntry {
  kind: FunctionEntryKind;
  node: ast.TSESTreeFunction;
  hasEarlyReturn: boolean;
  isAsync: boolean;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the [Rules of Hooks](https://react.dev/reference/rules/rules-of-react#rules-of-hooks).",
    },
    messages: {
      afterEarlyReturn:
        "React Hook '{{name}}' is called after an early return. React Hooks must be called in the exact same order in every component render.",
      asyncHook:
        "React Hook '{{name}}' is called in an async function. React Hooks must be called in a synchronous React function component or custom Hook.",
      classHook:
        "React Hook '{{name}}' cannot be called in a class component. React Hooks can only be called in function components or custom Hooks.",
      conditionalHook:
        "React Hook '{{name}}' is called conditionally. React Hooks must be called in the exact same order in every component render.",
      invalidContext:
        "React Hook '{{name}}' is called in function '{{funcName}}' that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word 'use'.",
      loopHook:
        "React Hook '{{name}}' may be executed more than once. React Hooks must be called in the exact same order in every component render.",
      nestedHook:
        "React Hook '{{name}}' is called in a nested function. React Hooks must be called at the top level of a React function component or custom Hook.",
      topLevelHook:
        "React Hook '{{name}}' cannot be called at the top level. React Hooks must be called in a React function component or custom Hook.",
      useInTryCatch:
        "React Hook '{{name}}' cannot be called inside a try/catch block. To handle errors, wrap your component in an error boundary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function getHookName(node: TSESTree.CallExpression): string {
  if (node.callee.type === AST.Identifier) {
    return node.callee.name;
  }
  if (node.callee.type === AST.MemberExpression && node.callee.property.type === AST.Identifier) {
    return node.callee.property.name;
  }
  return "unknown";
}

function isUseCall(node: TSESTree.CallExpression): boolean {
  if (node.callee.type === AST.Identifier) {
    return node.callee.name === "use";
  }
  if (node.callee.type === AST.MemberExpression && node.callee.property.type === AST.Identifier) {
    return node.callee.property.name === "use";
  }
  return false;
}

function getFunctionEntryKind(node: ast.TSESTreeFunction): FunctionEntryKind {
  const id = ast.getFunctionId(node);
  if (id == null) return "other";
  if (id.type === AST.Identifier) {
    if (core.isHookName(id.name)) return "hook";
    if (/^[A-Z]/.test(id.name)) return "component";
  }
  if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
    if (core.isHookName(id.property.name)) return "hook";
    if (/^[A-Z]/.test(id.property.name)) return "component";
  }
  return "other";
}

function isConditionalNode(node: TSESTree.Node) {
  return node.type === AST.IfStatement
    || node.type === AST.SwitchStatement
    || node.type === AST.ConditionalExpression
    || node.type === AST.LogicalExpression;
}

function isLoopNode(node: TSESTree.Node) {
  return node.type === AST.ForStatement
    || node.type === AST.ForInStatement
    || node.type === AST.ForOfStatement
    || node.type === AST.WhileStatement
    || node.type === AST.DoWhileStatement;
}

function isTryCatchNode(node: TSESTree.Node) {
  return node.type === AST.TryStatement;
}

export function create(context: RuleContext<MessageID, []>) {
  const functionStack: FunctionEntry[] = [];

  function findEnclosingComponentOrHook(): FunctionEntry | unit {
    for (let i = functionStack.length - 1; i >= 0; i--) {
      const entry = functionStack[i];
      if (entry == null) continue;
      if (entry.kind === "component" || entry.kind === "hook") {
        return entry;
      }
    }
    return unit;
  }

  function checkHookCall(node: TSESTree.CallExpression) {
    const hookName = getHookName(node);
    const isUse = isUseCall(node);

    // 1.7: Module-level hook call detection
    if (functionStack.length === 0) {
      context.report({ messageId: "topLevelHook", node, data: { name: hookName } });
      return;
    }

    // Find the enclosing component or hook
    const boundary = findEnclosingComponentOrHook();

    // No valid component/hook boundary found
    if (boundary == null) {
      // Check if we're inside a class
      const classAncestor = ast.findParentNode(node, ast.isClass);
      if (classAncestor != null) {
        context.report({ messageId: "classHook", node, data: { name: hookName } });
        return;
      }
      // We're inside a regular (non-component, non-hook) function
      const currentEntry = functionStack.at(-1);
      if (currentEntry == null) return;
      const funcId = ast.getFunctionId(currentEntry.node);
      const funcName = funcId != null && funcId.type === AST.Identifier ? funcId.name : "anonymous";
      context.report({ messageId: "invalidContext", node, data: { name: hookName, funcName } });
      return;
    }

    // Check if the current (innermost) function is async
    const currentEntry = functionStack.at(-1);
    if (currentEntry != null && currentEntry.isAsync) {
      context.report({ messageId: "asyncHook", node, data: { name: hookName } });
      return;
    }

    // Check if the boundary function itself is async
    if (boundary.isAsync) {
      context.report({ messageId: "asyncHook", node, data: { name: hookName } });
      return;
    }

    // Walk ancestors from the hook call up to the boundary function
    // checking for conditionals, loops, nested functions, try/catch, and classes
    let current: TSESTree.Node | unit = node.parent;
    while (current != null && current !== boundary.node) {
      // Class detection
      if (ast.isClass(current)) {
        context.report({ messageId: "classHook", node, data: { name: hookName } });
        return;
      }

      // Nested function detection
      if (ast.isFunction(current) && current !== boundary.node) {
        // Check if this nested function is itself a component or hook
        const nestedKind = getFunctionEntryKind(current);
        if (nestedKind === "component" || nestedKind === "hook") {
          // This is a valid boundary — stop walking
          break;
        }
        context.report({ messageId: "nestedHook", node, data: { name: hookName } });
        return;
      }

      // Conditional detection (skip for `use()`)
      if (!isUse && isConditionalNode(current)) {
        context.report({ messageId: "conditionalHook", node, data: { name: hookName } });
        return;
      }

      // Loop detection (skip for `use()`)
      if (!isUse && isLoopNode(current)) {
        context.report({ messageId: "loopHook", node, data: { name: hookName } });
        return;
      }

      // Try/catch detection (only for `use()`)
      if (isUse && isTryCatchNode(current)) {
        context.report({ messageId: "useInTryCatch", node, data: { name: hookName } });
        return;
      }

      current = current.parent;
    }

    // Check early return flag on the boundary function
    if (boundary.hasEarlyReturn) {
      context.report({ messageId: "afterEarlyReturn", node, data: { name: hookName } });
      return;
    }
  }

  return defineRuleListener(
    {
      ":function"(node: ast.TSESTreeFunction) {
        const kind = getFunctionEntryKind(node);
        functionStack.push({
          kind,
          node,
          hasEarlyReturn: false,
          isAsync: node.async,
        });
      },
      ":function:exit"() {
        functionStack.pop();
      },
      CallExpression(node: TSESTree.CallExpression) {
        if (!core.isHookCall(node)) return;
        checkHookCall(node);
      },
      ReturnStatement(node: TSESTree.ReturnStatement) {
        if (functionStack.length === 0) return;
        const entry = functionStack.at(-1);
        if (entry == null) return;
        // Check if this return is not the last statement in the function body
        const fnNode = entry.node;
        if (fnNode.body.type !== AST.BlockStatement) return;
        const body = fnNode.body.body;
        // Find the parent statement that is a direct child of the function body
        let stmt: TSESTree.Node = node;
        while (stmt.parent !== fnNode.body) {
          if (stmt.parent == null) return;
          stmt = stmt.parent;
        }
        const idx = body.indexOf(stmt as TSESTree.Statement);
        if (idx !== -1 && idx < body.length - 1) {
          entry.hasEarlyReturn = true;
        }
      },
    },
  );
}
