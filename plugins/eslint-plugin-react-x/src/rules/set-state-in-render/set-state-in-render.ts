import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import { not } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "@/utils/create-rule";
import { isComponentOrHookLikeFunction, isInsideConditional, isInsideEventHandler } from "./lib";

export const RULE_NAME = "set-state-in-render";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

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
  const functionEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const componentFnRef: { current: TSESTreeFunction | null } = { current: null };
  const componentHasEarlyReturn: { current: boolean } = { current: false };

  function isUseStateCall(node: TSESTree.Node) {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isIdFromUseStateCall(topLevelId: TSESTree.Identifier, at?: number) {
    const initNode = resolve(context, topLevelId);
    if (initNode == null) return false;
    if (initNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(initNode)) return false;
    const initNodeParent = initNode.parent;
    if (!("id" in initNodeParent) || initNodeParent.id?.type !== AST.ArrayPattern) {
      return true;
    }
    return initNodeParent
      .id
      .elements
      .findIndex((e) => e?.type === AST.Identifier && e.name === topLevelId.name) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    switch (callee.type) {
      // const data = useState();
      // data.at(1)();
      case AST.CallExpression: {
        const innerCallee = Extract.unwrap(callee.callee);
        if (innerCallee.type !== AST.MemberExpression) {
          return false;
        }
        if (!("name" in innerCallee.object)) {
          return false;
        }
        const isAt = innerCallee.property.type === AST.Identifier && innerCallee.property.name === "at";
        const [index] = callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isIdFromUseStateCall(innerCallee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isIdFromUseStateCall(callee, 1);
      }
      // const data = useState();
      // data[1]();
      case AST.MemberExpression: {
        if (!("name" in callee.object)) {
          return false;
        }
        const property = callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isIdFromUseStateCall(callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  function getFunctionKind(node: TSESTreeFunction): FunctionKind {
    if (isComponentOrHookLikeFunction(node)) {
      return "component";
    }
    const parent = Traverse.findParent(node, not(Check.isTypeExpression)) ?? node.parent;
    if (parent.type === AST.CallExpression && parent.callee !== node) {
      return "callback";
    }
    return "other";
  }

  return merge(
    {
      ":function"(node: TSESTreeFunction) {
        const kind = getFunctionKind(node);
        functionEntries.push({ kind, node });
        if (kind === "component") {
          componentFnRef.current = node;
          componentHasEarlyReturn.current = false;
        }
      },
      ":function:exit"(node: TSESTreeFunction) {
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
          data: {
            name: context.sourceCode.getText(Extract.unwrap(node.callee)),
          },
          messageId: "default",
          node,
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
