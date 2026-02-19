import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { not } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { findVariable, getVariableInitializer } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../utils";

export const RULE_NAME = "set-state-in-render";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

type FunctionKind =
  | "component"
  | "callback"
  | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.",
    },
    messages: {
      default:
        "Do not call the 'set' function '{{name}}' unconditionally during render. This will trigger an infinite render loop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { additionalStateHooks } = getSettingsFromContext(context);
  const functionEntries: { kind: FunctionKind; node: ast.TSESTreeFunction }[] = [];
  const componentFnRef: { current: ast.TSESTreeFunction | null } = { current: null };
  const componentHasEarlyReturn: { current: boolean } = { current: false };

  function isUseStateCall(node: TSESTree.Node) {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isIdFromUseStateCall(topLevelId: TSESTree.Identifier, at?: number) {
    const variable = findVariable(topLevelId, context.sourceCode.getScope(topLevelId));
    const variableNode = getVariableInitializer(variable, 0);
    if (variableNode == null) return false;
    if (variableNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(variableNode)) return false;
    const variableNodeParent = variableNode.parent;
    if (!("id" in variableNodeParent) || variableNodeParent.id?.type !== AST.ArrayPattern) {
      return true;
    }
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e?.type === AST.Identifier && e.name === topLevelId.name) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    switch (node.callee.type) {
      // const data = useState();
      // data.at(1)();
      case AST.CallExpression: {
        const { callee } = node.callee;
        if (callee.type !== AST.MemberExpression) {
          return false;
        }
        if (!("name" in callee.object)) {
          return false;
        }
        const isAt = callee.property.type === AST.Identifier && callee.property.name === "at";
        const [index] = node.callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isIdFromUseStateCall(callee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isIdFromUseStateCall(node.callee, 1);
      }
      // const data = useState();
      // data[1]();
      case AST.MemberExpression: {
        if (!("name" in node.callee.object)) {
          return false;
        }
        const property = node.callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isIdFromUseStateCall(node.callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  function isInsideConditional(node: TSESTree.Node, stopAt: ast.TSESTreeFunction) {
    let current: TSESTree.Node | undefined = node.parent;
    while (current != null && current !== stopAt) {
      switch (current.type) {
        case AST.IfStatement:
        case AST.ConditionalExpression:
        case AST.LogicalExpression:
        case AST.SwitchStatement:
        case AST.SwitchCase:
          return true;
        default:
          break;
      }
      current = current.parent;
    }
    return false;
  }

  function isInsideEventHandler(node: TSESTree.Node, stopAt: ast.TSESTreeFunction) {
    let current: TSESTree.Node | undefined = node.parent;
    while (current != null && current !== stopAt) {
      if (ast.isFunction(current) && current !== stopAt) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  function isComponentLikeFunction(node: ast.TSESTreeFunction) {
    const id = ast.getFunctionId(node);
    if (id == null) return false;
    if (id.type === AST.Identifier) {
      return core.isComponentName(id.name);
    }
    if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
      return core.isComponentName(id.property.name);
    }
    return false;
  }

  function getFunctionKind(node: ast.TSESTreeFunction): FunctionKind {
    if (isComponentLikeFunction(node)) {
      return "component";
    }
    const parent = ast.findParentNode(node, not(ast.isTypeExpression)) ?? node.parent;
    if (parent.type === AST.CallExpression && parent.callee !== node) {
      return "callback";
    }
    return "other";
  }

  return defineRuleListener(
    {
      ":function"(node: ast.TSESTreeFunction) {
        const kind = getFunctionKind(node);
        functionEntries.push({ kind, node });
        if (kind === "component") {
          componentFnRef.current = node;
          componentHasEarlyReturn.current = false;
        }
      },
      ":function:exit"(node: ast.TSESTreeFunction) {
        const entry = functionEntries.at(-1);
        if (entry?.kind === "component" && componentFnRef.current === node) {
          componentFnRef.current = null;
          componentHasEarlyReturn.current = false;
        }
        functionEntries.pop();
      },
      CallExpression(node) {
        const componentFn = componentFnRef.current;
        if (componentFn == null) return;
        if (!isSetStateCall(node)) return;
        // Allow setState inside nested functions (event handlers, callbacks, etc.)
        if (isInsideEventHandler(node, componentFn)) return;
        // Allow setState inside conditional blocks
        if (isInsideConditional(node, componentFn)) return;
        // Allow setState after an early return (it is conditionally guarded by the early return)
        if (componentHasEarlyReturn.current) return;
        context.report({
          messageId: "default",
          node,
          data: {
            name: context.sourceCode.getText(node.callee),
          },
        });
      },
      ReturnStatement(node: TSESTree.ReturnStatement) {
        const componentFn = componentFnRef.current;
        if (componentFn == null) return;
        // Only track early returns that belong directly to the component function
        const entry = functionEntries.at(-1);
        if (entry == null || entry.node !== componentFn) return;
        if (componentFn.body.type !== AST.BlockStatement) return;
        const body = componentFn.body.body;
        // Walk up from the return statement to find the direct child statement of the function body
        let stmt: TSESTree.Node = node;
        while (stmt.parent !== componentFn.body) {
          if (stmt.parent == null) return;
          stmt = stmt.parent;
        }
        const idx = body.indexOf(stmt as TSESTree.Statement);
        if (idx !== -1 && idx < body.length - 1) {
          componentHasEarlyReturn.current = true;
        }
      },
    },
  );
}
