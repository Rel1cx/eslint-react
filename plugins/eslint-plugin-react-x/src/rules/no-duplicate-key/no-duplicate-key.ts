import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

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
  // Fast path: skip if `key=` is not present in the file
  if (!context.sourceCode.text.includes("key=")) return {};
  // Key attributes that have at least one equal sibling, or are literal keys
  // inside a `.map()` callback where they repeat on every iteration
  const duplicateKeys = new Set<TSESTree.JSXAttribute>();
  // Key attributes grouped by their parent node, used to find duplicate siblings
  const siblingKeys = new Map<TSESTree.Node, TSESTree.JSXAttribute[]>();

  /**
   * Checks whether two `key` attributes have structurally equal values.
   * @param a The first key attribute.
   * @param b The second key attribute.
   * @returns `true` if both values are present and AST-equal, `false` otherwise.
   */
  function isKeyValueEqual(a: TSESTree.JSXAttribute, b: TSESTree.JSXAttribute): boolean {
    const aValue = a.value;
    const bValue = b.value;
    if (aValue == null || bValue == null) {
      return false;
    }
    return Compare.isEqual(aValue, bValue);
  }
  return {
    "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
      const jsxElement = node.parent.parent;
      switch (jsxElement.parent.type) {
        // Case 1: Elements in an array expression, JSX element, or JSX fragment
        case AST.ArrayExpression:
        case AST.JSXElement:
        case AST.JSXFragment: {
          const root = jsxElement.parent;
          const prevKeys = siblingKeys.get(root) ?? [];
          // Mark every key that has an equal sibling. Marking is monotonic so a
          // later unique key cannot clear an earlier duplicate (ex: `[A, A, B]`)
          for (const prevKey of prevKeys) {
            if (!isKeyValueEqual(prevKey, node)) continue;
            duplicateKeys.add(prevKey);
            duplicateKeys.add(node);
            break;
          }
          siblingKeys.set(root, [...prevKeys, node]);
          break;
        }
        // Case 2: Elements created by an array's .map() call
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
          const iter = Traverse.findParent(jsxElement, Check.isFunction, (n) => n === call);
          if (iter == null) return;
          const arg0 = call.arguments[0];
          if (arg0 == null) return;
          // Ensure we are inside the callback of the .map() call
          if (Extract.unwrap(arg0) !== iter) {
            return;
          }
          // Flag literal keys in .map() calls as they are a common source of duplication.
          // Dynamic keys are not recorded, so they cannot overwrite a literal one.
          if (node.value?.type === AST.Literal) {
            duplicateKeys.add(node);
          }
        }
      }
    },
    "Program:exit"() {
      for (const key of duplicateKeys) {
        context.report({
          messageId: "default",
          node: key,
        });
      }
    },
  };
}
