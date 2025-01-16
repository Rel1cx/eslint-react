import * as AST from "@eslint-react/ast";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "CHK",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noUselessFragment"
  | "noUselessFragmentInBuiltIn";

type Options = [
  {
    allowExpressions: boolean;
  },
];

const defaultOptions = [{
  allowExpressions: true,
}] as const satisfies Options;

function checkAndReport(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
  allowExpressions: boolean,
) {
  const initialScope = context.sourceCode.getScope(node);
  // return if the fragment is keyed (e.g. <Fragment key={key}>)
  if (JSX.isKeyedElement(node, initialScope)) {
    return;
  }
  // report if the fragment is placed inside a built-in component (e.g. <div><></></div>)
  if (JSX.isBuiltInElement(node.parent)) {
    context.report({ messageId: "noUselessFragmentInBuiltIn", node });
  }
  // report and return if the fragment has no children (e.g. <></>)
  if (node.children.length === 0) {
    context.report({ messageId: "noUselessFragment", node });
    return;
  }
  const isChildElement = AST.isOneOf([T.JSXElement, T.JSXFragment])(node.parent);
  switch (true) {
    // <Foo content={<>ee eeee eeee ...</>} />
    case allowExpressions
      && !isChildElement
      && node.children.length === 1
      && JSX.isLiteral(node.children.at(0)): {
      return;
    }
    // <Foo><>hello, world</></Foo>
    case !allowExpressions
      && isChildElement: {
      context.report({ messageId: "noUselessFragment", node });
      return;
    }
    case !allowExpressions
      && !isChildElement
      && node.children.length === 1: {
      // const foo = <>{children}</>;
      // return <>{children}</>;
      context.report({ messageId: "noUselessFragment", node });
      return;
    }
  }
  const nonPaddingChildren = node.children.filter((child) => !JSX.isPaddingSpaces(child));
  const firstNonPaddingChild = nonPaddingChildren.at(0);
  switch (true) {
    case nonPaddingChildren.length === 0:
    case nonPaddingChildren.length === 1
      && firstNonPaddingChild?.type !== T.JSXExpressionContainer: {
      context.report({ messageId: "noUselessFragment", node });
      return;
    }
  }
  return;
}

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "disallow unnecessary fragments",
    },
    messages: {
      noUselessFragment: "A fragment contains less than two children is unnecessary.",
      noUselessFragmentInBuiltIn: "A fragment placed inside a built-in component is unnecessary.",
    },
    schema: [{
      type: "object",
      additionalProperties: false,
      properties: {
        allowExpressions: {
          type: "boolean",
          description: "Allow fragments with a single expression child",
        },
      },
    }],
  },
  name: RULE_NAME,
  create(context, [option]) {
    const { allowExpressions = true } = option;
    return {
      JSXElement(node) {
        if (!JSX.isFragmentElement(node)) return;
        checkAndReport(node, context, allowExpressions);
      },
      JSXFragment(node) {
        checkAndReport(node, context, allowExpressions);
      },
    };
  },
  defaultOptions,
});
