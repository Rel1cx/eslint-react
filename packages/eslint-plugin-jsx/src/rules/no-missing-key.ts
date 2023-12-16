import {
  getNestedReturnStatements,
  is,
  isOneOf,
  NodeType,
  unsafeIsArrayFromCall,
  unsafeIsMapCall,
} from "@eslint-react/ast";
import { getFragmentFromContext, getPragmaFromContext, hasProp } from "@eslint-react/jsx";
import { M, MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import { createRule, getChildrenToArraySelector } from "../utils";

export const RULE_NAME = "no-missing-key";

export type MessageID =
  | "NO_MISSING_KEY"
  | "NO_MISSING_KEY_WITH_FRAGMENT";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "require `key` prop when rendering list",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_MISSING_KEY: "Missing `key` prop for element when rendering list",
      NO_MISSING_KEY_WITH_FRAGMENT:
        "Missing `key` prop for element when rendering list. Use `{{reactPragma}}.{{fragmentPragma}}` component instead of `<>` because it does not support key prop",
    },
  },
  defaultOptions: [],
  create(context) {
    const reactPragma = getPragmaFromContext(context);
    const fragmentPragma = getFragmentFromContext(context);
    const childrenToArraySelector = getChildrenToArraySelector(reactPragma);
    const isWithinChildrenToArrayRef = MutRef.make(false);
    function checkIteratorElement(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

      if (node.type === NodeType.JSXElement && !hasProp(node.openingElement.attributes, "key", context, initialScope)) {
        return O.some({
          messageId: "NO_MISSING_KEY",
          node,
        });
      }
      if (node.type === NodeType.JSXFragment) {
        return O.some({
          data: {
            fragmentPragma,
            reactPragma,
          },
          messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
          node,
        });
      }

      return O.none();
    }

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return M.match(node)
        .with({ type: NodeType.JSXElement }, checkIteratorElement)
        .with({ type: NodeType.JSXFragment }, checkIteratorElement)
        .with({ type: NodeType.ConditionalExpression }, (n) => {
          if (!("consequent" in n)) {
            return O.none();
          }

          return O.orElse(checkIteratorElement(n.consequent), () => checkIteratorElement(n.alternate));
        })
        .with({ type: NodeType.LogicalExpression }, (n) => {
          if (!("left" in n)) {
            return O.none();
          }

          return O.orElse(checkIteratorElement(n.left), () => checkIteratorElement(n.right));
        })
        .otherwise(O.none);
    }

    function checkBlockStatement(node: TSESTree.BlockStatement) {
      return getNestedReturnStatements(node)
        .reduce<ReportDescriptor<MessageID>[]>((acc, statement) => {
          if (!statement.argument) {
            return acc;
          }
          const maybeDescriptor = checkIteratorElement(statement.argument);
          if (O.isNone(maybeDescriptor)) {
            return acc;
          }
          const descriptor = maybeDescriptor.value;

          return [...acc, descriptor];
        }, []);
    }

    return {
      [childrenToArraySelector]() {
        MutRef.set(isWithinChildrenToArrayRef, true);
      },
      [`${childrenToArraySelector}:exit`]() {
        MutRef.set(isWithinChildrenToArrayRef, false);
      },
      ArrayExpression(node) {
        if (MutRef.get(isWithinChildrenToArrayRef)) {
          return;
        }
        const elements = node.elements.filter(is(NodeType.JSXElement));
        if (elements.length === 0) {
          return;
        }

        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

        for (const element of elements) {
          if (!hasProp(element.openingElement.attributes, "key", context, initialScope)) {
            context.report({
              messageId: "NO_MISSING_KEY",
              node: element,
            });
          }
        }
      },
      CallExpression(node) {
        const isMapCall = unsafeIsMapCall(node);
        const isArrayFromCall = unsafeIsArrayFromCall(node);
        if (!isMapCall && !isArrayFromCall) {
          return;
        }
        if (MutRef.get(isWithinChildrenToArrayRef)) {
          return;
        }
        const fn = node.arguments[isMapCall ? 0 : 1];
        if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(fn)) {
          return;
        }
        if (fn.body.type === NodeType.BlockStatement) {
          for (const descriptor of checkBlockStatement(fn.body)) {
            context.report(descriptor);
          }

          return;
        }
        O.map(checkExpression(fn.body), context.report);
      },
      JSXFragment(node) {
        if (MutRef.get(isWithinChildrenToArrayRef)) {
          return;
        }
        if (node.parent.type === NodeType.ArrayExpression) {
          context.report({
            data: {
              fragmentPragma,
              reactPragma,
            },
            messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
            node,
          });
        }
      },
    };
  },
});
