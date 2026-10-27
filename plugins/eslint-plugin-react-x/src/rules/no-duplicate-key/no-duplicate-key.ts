import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

/** Key attributes compared together, grouped by the JSX container or `.map()` call that repeats them. */
type KeyGroup = {
  hasDuplicate: boolean;
  keys: TSESTree.JSXAttribute[];
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

  function recordSiblingKey(root: TSESTree.Node, key: TSESTree.JSXAttribute): void {
    const prevKeys = keyGroups.get(root)?.keys ?? [];
    keyGroups.set(root, {
      // A later unique key clears an earlier duplicate flag (`[A, A, B]` is not reported).
      hasDuplicate: prevKeys.some((prevKey) => isKeyValueEqual(prevKey, key)),
      keys: [...prevKeys, key],
    });
  }

  function recordMapCallbackKey(call: TSESTree.CallExpression, key: TSESTree.JSXAttribute): void {
    keyGroups.set(call, {
      // A literal key repeats on every iteration; a later key overwrites this entry.
      hasDuplicate: key.value?.type === AST.Literal,
      keys: [key],
    });
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
          const callback = call.arguments[0];
          if (callback == null) return;
          const enclosingFunction = Traverse.findParent(jsxElement, Check.isFunction, (n) => n === call);
          if (enclosingFunction !== Extract.unwrap(callback)) return;
          recordMapCallbackKey(call, node);
        }
      }
    },
    "Program:exit"() {
      for (const { hasDuplicate, keys } of keyGroups.values()) {
        if (!hasDuplicate) continue;
        for (const key of keys) {
          context.report({
            messageId: "default",
            node: key,
          });
        }
      }
    },
  };
}

function isKeyValueEqual(a: TSESTree.JSXAttribute, b: TSESTree.JSXAttribute): boolean {
  const aValue = a.value;
  const bValue = b.value;
  // Valueless keys (`key`) never match.
  if (aValue == null || bValue == null) return false;
  return Compare.isEqual(aValue, bValue);
}
