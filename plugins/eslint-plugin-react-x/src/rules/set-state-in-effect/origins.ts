import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { DefinitionType, type Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { getNestedIdentifiers, isTerminatingStatement } from "./helpers";

/**
 * Create a resolver that answers whether an identifier or call originates from
 * a `useState`-like hook's setter function (the element at index 1 of the
 * returned tuple).
 * @param context The rule context
 * @returns The setState provenance resolver
 */
export function createSetStateResolver(context: RuleContext) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isSetStateId(id: TSESTree.Identifier, at?: number) {
    const initNode = resolveOrigin(context, id);
    if (initNode == null) return false;
    if (initNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(initNode)) return false;
    const variableNodeParent = initNode.parent;
    if (!("id" in variableNodeParent) || variableNodeParent.id?.type !== AST.ArrayPattern) {
      return true;
    }
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e != null && Check.isIdentifier(e, id.name)) === at;
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
        const isAt = Extract.getCalleeName(callee) === "at";
        const [index] = callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isSetStateId(innerCallee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isSetStateId(callee, 1);
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
        return propertyValue === 1 && isSetStateId(callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  return { isSetStateCall, isSetStateId, isUseStateCall } as const;
}

export function isInitializedFromRef(context: RuleContext, name: string, initialScope: Scope, seen = new Set<string>()): boolean {
  const { additionalRefHooks } = getSettingsFromContext(context);
  if (seen.has(name)) return false;
  seen.add(name);
  for (const def of findVariable(initialScope, name)?.defs ?? []) {
    // A parameter named `ref`/`xxxRef` is treated as a ref by the same naming
    // heuristic used for member-chain roots (ex: `function useDetect(ref) { ... ref.current ... }`)
    if (def.type === DefinitionType.Parameter) {
      if (def.name.type === AST.Identifier && (def.name.name === "ref" || def.name.name.endsWith("Ref"))) {
        return true;
      }
      continue;
    }
    const { node } = def;
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init == null ? null : Extract.unwrap(node.init);
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      // const identifier = containerRef.current.offsetWidth;
      case init.type === AST.MemberExpression: {
        let current: TSESTree.Node = init;
        // Walk the member chain; a `<ref-named>.current` link marks the value
        // as read from a ref (ex: `popover.contentRef.current`)
        while (current.type === AST.MemberExpression) {
          const property = Extract.unwrap(current.property);
          const object = Extract.unwrap(current.object);
          if (!current.computed && Check.isIdentifier(property, "current")) {
            const sourceName = getRefSourceName(object);
            if (sourceName === "ref" || sourceName?.endsWith("Ref") === true) {
              return true;
            }
          }
          current = object;
        }
        // const identifier = containerRef.foo; (rooted at a ref-named identifier)
        if (Check.isIdentifier(current) && (current.name === "ref" || current.name.endsWith("Ref"))) {
          return true;
        }
        // Fall back to tracing the identifiers used inside the chain so a
        // ref-rooted local still counts (ex: `scroller.clientWidth` where
        // `const scroller = scrollerRef.current`)
        return getNestedIdentifiers(init).some((id) => isInitializedFromRef(context, id.name, context.sourceCode.getScope(id), seen));
      }
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && core.isUseRefLikeCall(init, additionalRefHooks):
        return true;
      // Trace through arbitrary expressions so a ref read reaching the binding
      // via an intermediate computation still counts:
      // const dv = visible - prevVisible.current;
      default:
        return getNestedIdentifiers(init).some((id) => isInitializedFromRef(context, id.name, context.sourceCode.getScope(id), seen));
    }
  }
  return false;
}

/**
 * Check if the setState call is using a ref value, which is safe to use in an effect (ex: `setState(ref.current.scrollTop)`)
 * @param context The rule context
 * @param node The setState call argument to check
 * @returns `true` if the argument value is derived from a ref
 */
export function isArgumentUsingRefValue(context: RuleContext, node: TSESTree.CallExpressionArgument) {
  const isUsingRefValue = (n: TSESTree.Node): boolean => {
    switch (n.type) {
      case AST.Identifier:
        return isInitializedFromRef(context, n.name, context.sourceCode.getScope(n));
      case AST.MemberExpression:
        return isUsingRefValue(n.object);
      case AST.CallExpression:
        return isUsingRefValue(n.callee) || getNestedIdentifiers(n).some(isUsingRefValue);
      case AST.BinaryExpression:
      case AST.LogicalExpression:
        return isUsingRefValue(n.left) || isUsingRefValue(n.right);
      case AST.UnaryExpression:
      case AST.UpdateExpression:
        return isUsingRefValue(n.argument);
      case AST.ConditionalExpression:
        return isUsingRefValue(n.consequent) || isUsingRefValue(n.alternate);
      case AST.SequenceExpression:
        return n.expressions.some(isUsingRefValue);
      case AST.TemplateLiteral:
        return n.expressions.some(isUsingRefValue);
      case AST.TaggedTemplateExpression:
        return isUsingRefValue(n.tag) || isUsingRefValue(n.quasi);
      case AST.ObjectExpression:
        return n.properties.some(isUsingRefValue);
      case AST.Property:
        return isUsingRefValue(n.value);
      case AST.ArrayExpression:
        return n.elements.some((element) => element != null && isUsingRefValue(element));
      case AST.SpreadElement:
        return isUsingRefValue(n.argument);
      case AST.AssignmentExpression:
        return isUsingRefValue(n.right);
      default:
        return false;
    }
  };
  // Case 1: setState(ref.current.scrollTop);
  if (isUsingRefValue(node)) return true;
  // Case 2: setState(() => ref.current.scrollTop);
  return Check.isFunction(node)
    && context.sourceCode
      .getScope(node.body)
      .references
      .some((r) => isUsingRefValue(r.identifier));
}

/**
 * Check if a setState call is inside a conditional block whose test expression
 * is derived from a ref value (e.g. `if (prevRef.current !== value) setState(...)`).
 * @param context The ESLint rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside a ref-gated conditional block
 */
export function isRefGatedContext(context: RuleContext, node: TSESTree.Node): boolean {
  let child: TSESTree.Node = node;
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null) {
    if (Check.isFunction(current)) break;
    if (current.type === AST.IfStatement) {
      if (isRefInExpression(context, current.test)) return true;
    }
    if (current.type === AST.ConditionalExpression) {
      if (isRefInExpression(context, current.test)) return true;
    }
    if (current.type === AST.BlockStatement) {
      // A preceding early-return guard gates the rest of the block as well:
      // if (prevRef.current === value) return;
      // setState(...);
      const index = current.body.findIndex((statement) => statement === child);
      for (const statement of current.body.slice(0, Math.max(0, index))) {
        if (statement.type !== AST.IfStatement) continue;
        if (!isRefInExpression(context, statement.test)) continue;
        if (isTerminatingStatement(statement.consequent)) return true;
      }
    }
    child = current;
    current = current.parent;
  }
  return false;
}

function isRefInExpression(context: RuleContext, node: TSESTree.Node): boolean {
  return getNestedIdentifiers(node).some((id) => isInitializedFromRef(context, id.name, context.sourceCode.getScope(id)));
}

/**
 * Get the name that identifies the source of a `.current` member access.
 * @param node The object of the member expression
 * @returns The identifier name, the last property name of a member chain, or null
 */
function getRefSourceName(node: TSESTree.Node): string | null {
  switch (node.type) {
    case AST.Identifier:
      return node.name;
    case AST.MemberExpression: {
      const property = Extract.unwrap(node.property);
      return !node.computed && property.type === AST.Identifier
        ? property.name
        : null;
    }
    default:
      return null;
  }
}
