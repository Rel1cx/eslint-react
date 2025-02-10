import * as AST from "@eslint-react/ast";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "CHK",
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "uselessFragment";

type Options = [
  {
    allowExpressions: boolean;
  },
];

const defaultOptions = [{
  allowExpressions: true,
}] as const satisfies Options;

function trimLikeReact(text: string) {
  const leadingSpaces = /^\s*/.exec(text)?.[0] ?? "";
  const trailingSpaces = /\s*$/.exec(text)?.[0] ?? "";

  const start = leadingSpaces.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces.includes("\n") ? text.length - trailingSpaces.length : text.length;

  return text.slice(start, end);
}

function checkAndReport(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
  allowExpressions: boolean,
) {
  function fix(fixer: RuleFixer) {
    // Not safe to fix fragments without a jsx parent.
    if (!(node.parent.type === T.JSXElement || node.parent.type === T.JSXFragment)) {
      // const a = <></>
      if (node.children.length === 0) {
        return null;
      }

      // const a = <>cat {meow}</>
      if (
        node.children.some(
          (child) =>
            (JSX.isLiteral(child) && !JSX.isWhiteSpace(child))
            || AST.is(T.JSXExpressionContainer)(child),
        )
      ) {
        return null;
      }
    }

    // Not safe to fix `<Eeee><>foo</></Eeee>` because `Eeee` might require its children be a ReactElement.
    if (JSX.isUserDefinedElement(node.parent)) {
      return null;
    }

    const opener = node.type === T.JSXFragment ? node.openingFragment : node.openingElement;
    const closer = node.type === T.JSXFragment ? node.closingFragment : node.closingElement;

    const childrenText = opener.type === T.JSXOpeningElement && opener.selfClosing
      ? ""
      : context.sourceCode.getText().slice(opener.range[1], closer?.range[0]);

    return fixer.replaceText(node, trimLikeReact(childrenText));
  }

  const initialScope = context.sourceCode.getScope(node);
  // return if the fragment is keyed (e.g. <Fragment key={key}>)
  if (JSX.isKeyedElement(node, initialScope)) {
    return;
  }
  // report if the fragment is placed inside a built-in component (e.g. <div><></></div>)
  if (JSX.isBuiltInElement(node.parent)) {
    context.report({
      messageId: "uselessFragment",
      node,
      data: {
        reason: "placed inside a built-in component",
      },
      fix,
    });
  }
  // report and return if the fragment has no children (e.g. <></>)
  if (node.children.length === 0) {
    context.report({
      messageId: "uselessFragment",
      node,
      data: {
        reason: "contains less than two children",
      },
      fix,
    });
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
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix,
      });
      return;
    }
    case !allowExpressions
      && !isChildElement
      && node.children.length === 1: {
      // const foo = <>{children}</>;
      // return <>{children}</>;
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix,
      });
      return;
    }
  }
  const nonPaddingChildren = node.children.filter((child) => !JSX.isPaddingSpaces(child));
  const firstNonPaddingChild = nonPaddingChildren.at(0);
  switch (true) {
    case nonPaddingChildren.length === 0:
    case nonPaddingChildren.length === 1
      && firstNonPaddingChild?.type !== T.JSXExpressionContainer: {
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix,
      });
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
      description: "disallow useless fragments",
    },
    fixable: "code",
    messages: {
      uselessFragment: "A fragment {{reason}} is useless.",
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
