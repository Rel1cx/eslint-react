import { Check, Extract, Traverse } from "@eslint-react/ast";
import type { FunctionExpression } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { isUseRefCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching, match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "readDuringRender" | "writeDuringRender";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      readDuringRender:
        "Do not read 'ref.current' during render. Refs are not available during rendering and their values may be stale or inconsistent. Move this read into an effect or event handler.",
      writeDuringRender:
        "Do not write to 'ref.current' during render. Refs should only be mutated in effects or event handlers. Move this write into an effect or event handler.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hCollector = core.getHookCollector(context);
  const cCollector = core.getFunctionComponentCollector(context);

  // Collected ref.current accesses with their enclosing function
  const refAccesses: { isWrite: boolean; node: TSESTree.MemberExpression }[] = [];

  // Identifiers passed to JSX ref props
  const jsxRefIdentifiers = new Set<string>();

  /**
   * Check if the node is the operand of a `ref.current === null` test inside an IfStatement.
   * @param node The MemberExpression node for ref.current
   * @returns true if the node is part of a null check test in an if statement
   */
  function isInNullCheckTest(node: TSESTree.MemberExpression): boolean {
    let parent: TSESTree.Node = node.parent;
    while (Check.isTypeExpression(parent)) parent = parent.parent;
    if (!isMatching({ type: AST.BinaryExpression, operator: P.union("===", "==", "!==", "!=") }, parent)) return false;
    const isLeftSide = parent.left === node || Extract.unwrapped(parent.left) === node;
    const otherSide = isLeftSide ? parent.right : parent.left;
    if (otherSide.type !== AST.Literal || otherSide.value != null) return false;
    return parent.parent.type === AST.IfStatement && parent.parent.test === parent;
  }

  /**
   * Check if a test expression is a null check on `ref.current` for a given ref name.
   * Matches forms like `ref.current === null`, `null === ref.current`, and their != variants.
   * @param test The test expression to check.
   * @param refName The name of the ref variable.
   */
  function isRefCurrentNullCheck(test: TSESTree.Expression, refName: string): boolean {
    if (test.type !== AST.BinaryExpression) return false;
    const op = test.operator;
    if (op !== "===" && op !== "==" && op !== "!==" && op !== "!=") return false;
    const { left, right } = test;
    const checkSides = (a: TSESTree.Node, b: TSESTree.Node) => {
      a = Check.isTypeExpression(a) ? Extract.unwrapped(a) : a;
      return a.type === AST.MemberExpression
        && a.object.type === AST.Identifier
        && a.object.name === refName
        && b.type === AST.Literal
        && b.value == null
        && Extract.propertyName(a.property) === "current";
    };
    return checkSides(left, right) || checkSides(right, left);
  }

  function isInitializedFromRef(name: string, initialScope: Scope) {
    for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
      if (node.type !== AST.VariableDeclarator) continue;
      const init = node.init;
      if (init == null) continue;
      switch (true) {
        // const identifier = anotherRef.current;
        case init.type === AST.MemberExpression
          && init.object.type === AST.Identifier
          && (init.object.name === "ref" || init.object.name.endsWith("Ref")):
          return true;
        // const identifier = useRef();
        case init.type === AST.CallExpression
          && isUseRefCall(context, init):
          return true;
      }
    }
    return false;
  }

  return merge(
    hCollector.visitor,
    cCollector.visitor,
    {
      // Track JSX ref props: <div ref={someRef} />
      JSXAttribute(node: TSESTree.JSXAttribute) {
        switch (true) {
          case node.name.type === AST.JSXIdentifier
            && node.name.name === "ref"
            && node.value?.type === AST.JSXExpressionContainer
            && node.value.expression.type === AST.Identifier:
            jsxRefIdentifiers.add(node.value.expression.name);
            return;
        }
      },
      // Track ref.current accesses
      MemberExpression(node: TSESTree.MemberExpression) {
        if (!Check.identifier(node.property, "current")) return;
        refAccesses.push({
          isWrite: (() => {
            let parent: TSESTree.Node = node.parent;
            while (Check.isTypeExpression(parent)) parent = parent.parent;
            return match(parent)
              .with(
                {
                  type: AST.AssignmentExpression,
                },
                (p) => p.left === node || Extract.unwrapped(p.left) === node,
              )
              .with(
                {
                  type: AST.UpdateExpression,
                },
                (p) => p.argument === node || Extract.unwrapped(p.argument) === node,
              )
              .otherwise(() => false);
          })(),
          node,
        });
      },
      "Program:exit"(program) {
        const comps = cCollector.api.getAllComponents(program);
        const hooks = hCollector.api.getAllHooks(program);
        const funcs = new Set([
          ...comps.map((c) => c.node),
          ...hooks.map((h) => h.node),
        ]);

        const isCompOrHookFn = (n: TSESTree.Node): n is FunctionExpression => Check.isFunction(n) && funcs.has(n);

        for (const { isWrite, node } of refAccesses) {
          // Inline isRefIdentifier — must be accessing .current on a ref
          const obj = node.object;
          if (obj.type !== AST.Identifier) continue;
          switch (true) {
            case obj.name === "ref" || obj.name.endsWith("Ref"):
            case jsxRefIdentifiers.has(obj.name):
            case isInitializedFromRef(obj.name, context.sourceCode.getScope(node.object)):
              break;
            default:
              continue;
          }

          // Find the enclosing component or hook function
          const boundary = Traverse.findParent(node, isCompOrHookFn);

          // Not inside a component or hook - could be a ref used in a non-React function, which is fine
          if (boundary == null) continue;

          if (Traverse.findParent(node, Check.isFunction) !== boundary) continue;

          //
          // Standard:
          //   if (ref.current === null) { ref.current = value; }
          //
          // Inverted (with early return):
          //   if (ref.current !== null) { return ...; }
          //   ref.current = computeValue();
          const refName = obj.name;
          let isLazyInit = isInNullCheckTest(node);
          if (!isLazyInit) {
            let current: TSESTree.Node | null = node.parent;
            findIf: while (current != null) {
              if (current.type === AST.IfStatement) {
                if (isRefCurrentNullCheck(current.test, refName)) isLazyInit = true;
                break;
              }
              switch (current.type) {
                case AST.ExpressionStatement:
                case AST.BlockStatement:
                case AST.ReturnStatement:
                case AST.JSXExpressionContainer:
                case AST.JSXElement:
                case AST.JSXOpeningElement:
                case AST.JSXClosingElement:
                case AST.AssignmentExpression:
                case AST.VariableDeclaration:
                case AST.VariableDeclarator:
                case AST.MemberExpression:
                case AST.ChainExpression:
                case AST.CallExpression:
                  break;
                default:
                  break findIf;
              }
              current = current.parent;
            }
          }

          if (!isLazyInit && isWrite) {
            let stmt: TSESTree.Node = node;
            while (stmt.parent != null && stmt.parent.type !== AST.BlockStatement) {
              stmt = stmt.parent;
            }
            if (stmt.parent?.type === AST.BlockStatement) {
              const block = stmt.parent;
              const stmtIdx = block.body.indexOf(stmt as TSESTree.Statement);
              if (stmtIdx >= 0) {
                for (let i = stmtIdx - 1; i >= 0; i--) {
                  const sibling = block.body[i];
                  if (sibling == null) continue;
                  if (sibling.type === AST.IfStatement && isRefCurrentNullCheck(sibling.test, refName)) {
                    isLazyInit = true;
                    break;
                  }
                }
              }
            }
          }

          if (isLazyInit) continue;

          context.report({
            messageId: isWrite
              ? "writeDuringRender"
              : "readDuringRender",
            node,
          });
        }
      },
    },
  );
}
