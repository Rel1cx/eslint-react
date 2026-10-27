import { createRule } from "@/utils/create-rule";
import { getIteratorCallback } from "@/utils/jsx-iterator";
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
  // Fast path: skip files with no JSX `key` attribute. Word boundaries also
  // match bare keys (`key`) and keys separated from `=` by whitespace.
  if (!/\bkey\b/u.test(context.sourceCode.text)) return {};
  // Key attributes that have at least one equal sibling, or are literal keys
  // inside a `.map()` callback where they repeat on every iteration
  const duplicateKeys = new Set<TSESTree.JSXAttribute>();
  // Key attributes grouped by their parent node, used to find duplicate siblings
  const siblingKeys = new Map<TSESTree.Node, TSESTree.JSXAttribute[]>();

  /**
   * Gets the node that represents a key attribute's value, unwrapping
   * `JSXExpressionContainer`. A valueless key (`key`) is represented by `null`.
   * @param node The key attribute to inspect.
   * @returns The value node, or `null` for a valueless key.
   */
  function getKeyValue(node: TSESTree.JSXAttribute): TSESTree.Node | null {
    const { value } = node;
    if (value == null) return null;
    return value.type === AST.JSXExpressionContainer
      ? Extract.unwrap(value.expression)
      : value;
  }

  /**
   * Checks whether two `key` attributes have structurally equal values.
   * @param a The first key attribute.
   * @param b The second key attribute.
   * @returns `true` if both keys are valueless or their values are AST-equal.
   */
  function isKeyValueEqual(a: TSESTree.JSXAttribute, b: TSESTree.JSXAttribute): boolean {
    const aValue = getKeyValue(a);
    const bValue = getKeyValue(b);
    if (aValue == null || bValue == null) {
      return aValue === bValue;
    }
    return Compare.isEqual(aValue, bValue);
  }

  /**
   * Checks whether a key attribute has a statically fixed value. Dynamic keys
   * (identifiers, member/call expressions, template literals with expressions)
   * change per iteration and are not considered static.
   * @param node The key attribute to inspect.
   * @returns `true` if the key is a string/number literal, a template literal
   * without expressions, or a valueless key.
   */
  function isStaticKey(node: TSESTree.JSXAttribute): boolean {
    const value = getKeyValue(node);
    if (value == null) return true;
    if (value.type === AST.Literal) {
      return typeof value.value === "string" || typeof value.value === "number";
    }
    return value.type === AST.TemplateLiteral && value.expressions.length === 0;
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
        // Case 2: Elements created by an iterator-like call (map, flatMap, Array.from)
        default: {
          const call = Traverse.findParent(
            jsxElement,
            (n): n is TSESTree.CallExpression => n.type === AST.CallExpression && getIteratorCallback(n) != null,
          );
          if (call == null) return;
          const callback = getIteratorCallback(call);
          if (callback == null) return;
          const iter = Traverse.findParent(jsxElement, Check.isFunction, (n) => n === call);
          if (iter == null) return;
          // Ensure we are inside the callback of the iterator-like call
          if (callback !== iter) return;
          // Flag statically fixed keys in iterator callbacks as they repeat on
          // every iteration. Dynamic keys are not recorded, so they cannot
          // overwrite a static one.
          if (isStaticKey(node)) {
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
