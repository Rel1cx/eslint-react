import { createRule } from "@/utils/create-rule";
import { Check, Extract, Traverse } from "@eslint-react/ast";
import { isChildrenMap, isChildrenToArray } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { isKeyValueEqual, isRekeyedByChildrenCall, isReturnedBy, mapsProvablyAtMostOneElement } from "./lib";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

/** A recorded `key` attribute and whether it provably clashes with a sibling. */
type KeyEntry = {
  duplicate: boolean;
  node: TSESTree.JSXAttribute;
};

/** Key attributes compared together, grouped by the JSX container or `.map()` call that repeats them. */
type KeyGroup = {
  keys: KeyEntry[];
};

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents duplicate 'key' props on sibling elements when rendering lists.",
    },
    messages: {
      default: "The 'key' prop must be unique to its sibling elements.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip files with no JSX `key` attribute.
  if (!/\bkey\b/u.test(context.sourceCode.text)) return {};

  const keyGroups = new Map<TSESTree.Node, KeyGroup>();

  function getGroup(root: TSESTree.Node): KeyGroup {
    let group = keyGroups.get(root);
    if (group == null) {
      group = { keys: [] };
      keyGroups.set(root, group);
    }
    return group;
  }

  function recordSiblingKey(root: TSESTree.Node, key: TSESTree.JSXAttribute): void {
    // React re-assigns keys collected through `Children.toArray`/`Children.map`,
    // so duplicates there are impossible.
    if (isRekeyedByChildrenCall(context, root)) return;
    const group = getGroup(root);
    let duplicate = false;
    for (const entry of group.keys) {
      if (isKeyValueEqual(entry.node, key)) {
        entry.duplicate = true;
        duplicate = true;
      }
    }
    group.keys.push({ duplicate, node: key });
  }

  function recordMapCallbackKey(call: TSESTree.CallExpression, key: TSESTree.JSXAttribute): void {
    // A literal key repeats on every iteration; dynamic keys may differ per item.
    getGroup(call).keys.push({ duplicate: key.value?.type === AST.Literal, node: key });
  }

  return {
    "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
      const jsxElement = node.parent.parent;
      switch (jsxElement.parent.type) {
        case AST.ArrayExpression:
        case AST.JSXElement:
        case AST.JSXFragment: {
          recordSiblingKey(jsxElement.parent, node);
          return;
        }
        // Other elements are checked only when the `.map()` callback itself returns them.
        default: {
          const call = Traverse.findParent(
            jsxElement,
            (n): n is TSESTree.CallExpression => {
              if (n.type !== AST.CallExpression) return false;
              const callee = Extract.unwrap(n.callee);
              if (callee.type !== AST.MemberExpression) return false;
              return Check.isIdentifier(callee.property, "map");
            },
          );
          if (call == null) return;
          // React re-assigns the keys of `Children.map` output.
          if (isChildrenMap(context, call.callee) || isChildrenToArray(context, call.callee)) return;
          const callback = call.arguments[0];
          if (callback == null) return;
          const callbackFn = Extract.unwrap(callback);
          if (!Check.isFunction(callbackFn)) return;
          if (!isReturnedBy(jsxElement, callbackFn)) return;
          if (mapsProvablyAtMostOneElement(call)) return;
          recordMapCallbackKey(call, node);
        }
      }
    },
    "Program:exit"() {
      for (const { keys } of keyGroups.values()) {
        for (const { duplicate, node } of keys) {
          if (!duplicate) continue;
          context.report({
            messageId: "default",
            node,
          });
        }
      }
    },
  };
}
