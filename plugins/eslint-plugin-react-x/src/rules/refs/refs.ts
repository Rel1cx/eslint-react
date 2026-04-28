import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createRule } from "@/utils/create-rule";
import { isInNullCheckTest, isInitializedFromRef, isRefCurrentNullCheck } from "./lib";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "readDuringRender" | "writeDuringRender" | "refPassedToFunction";

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
      refPassedToFunction:
        "Passing a ref to a function may cause its value to be read during render. Pass 'ref.current' instead if the function only needs the value, or move the call into an effect.",
      writeDuringRender:
        "Do not write to 'ref.current' during render. Refs should only be mutated in effects or event handlers. Move this write into an effect or event handler.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

function resolveAlias(name: string, aliases: Map<string, string>): string {
  const visited = new Set<string>();
  while (aliases.has(name) && !visited.has(name)) {
    visited.add(name);
    name = aliases.get(name)!;
  }
  return name;
}

export function create(context: RuleContext<MessageID, []>) {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);

  // Collected ref.current accesses with their enclosing function
  const refAccesses: { isWrite: boolean; node: TSESTree.MemberExpression }[] = [];

  // Identifiers passed to JSX ref props
  const jsxRefIdentifiers = new Set<string>();

  // Variable aliases: aliasName -> originalName
  const aliases = new Map<string, string>();

  // Ref identifiers passed as arguments to non-hook function calls
  const refPassedToFunctions: { callNode: TSESTree.CallExpression; node: TSESTree.Identifier }[] = [];

  return merge(
    hc.visitor,
    fc.visitor,
    {
      // Track reassignment aliases: alias = ref;
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.operator !== "=") return;
        const left = Extract.unwrap(node.left);
        const right = Extract.unwrap(node.right);
        if (left.type !== AST.Identifier || right.type !== AST.Identifier) return;
        aliases.set(left.name, right.name);
      },
      // Track refs passed to non-hook function calls
      CallExpression(node: TSESTree.CallExpression) {
        const callee = Extract.unwrap(node.callee);
        const calleeName = callee.type === AST.Identifier
          ? callee.name
          : callee.type === AST.MemberExpression
          ? Extract.getPropertyName(callee.property)
          : null;
        if (
          calleeName != null && (
            calleeName.startsWith("use")
            || calleeName === "mergeRefs"
          )
        ) {
          return;
        }
        for (const arg of node.arguments) {
          const unwrapped = Extract.unwrap(arg);
          if (unwrapped.type !== AST.Identifier) continue;
          const resolvedName = resolveAlias(unwrapped.name, aliases);
          if (
            resolvedName === "ref"
            || resolvedName.endsWith("Ref")
            || jsxRefIdentifiers.has(resolvedName)
            || isInitializedFromRef(context, resolvedName, context.sourceCode.getScope(unwrapped))
          ) {
            refPassedToFunctions.push({ callNode: node, node: unwrapped });
          }
        }
      },
      // Track JSX ref props: <div ref={someRef} />
      JSXAttribute(node: TSESTree.JSXAttribute) {
        switch (true) {
          case node.name.type === AST.JSXIdentifier
            && node.name.name === "ref"
            && node.value?.type === AST.JSXExpressionContainer: {
            const expr = Extract.unwrap(node.value.expression);
            if (expr.type === AST.Identifier) {
              jsxRefIdentifiers.add(expr.name);
            }
            return;
          }
        }
      },
      // Track ref.current accesses (including computed: ref["current"])
      MemberExpression(node: TSESTree.MemberExpression) {
        if (Extract.getPropertyName(node.property) !== "current") return;
        refAccesses.push({
          isWrite: (() => {
            let parent: TSESTree.Node = node.parent;
            while (Check.isTypeExpression(parent)) parent = parent.parent;
            return match(parent)
              .with(
                {
                  type: AST.AssignmentExpression,
                },
                (p) => p.left === node || Extract.unwrap(p.left) === node,
              )
              .with(
                {
                  type: AST.UpdateExpression,
                },
                (p) => p.argument === node || Extract.unwrap(p.argument) === node,
              )
              .otherwise(() => false);
          })(),
          node,
        });
      },
      "Program:exit"(program) {
        const comps = fc.api.getAllComponents(program);
        const hooks = hc.api.getAllHooks(program);
        const funcs = new Set([
          ...comps.map((c) => c.node),
          ...hooks.map((h) => h.node),
        ]);

        const isCompOrHookFn = (n: TSESTree.Node): n is TSESTreeFunction => Check.isFunction(n) && funcs.has(n);

        for (const { isWrite, node } of refAccesses) {
          // Inline isRefIdentifier — must be accessing .current on a ref
          const obj = Extract.unwrap(node.object);
          if (obj.type !== AST.Identifier) continue;
          const resolvedName = resolveAlias(obj.name, aliases);
          switch (true) {
            case resolvedName === "ref" || resolvedName.endsWith("Ref"):
            case jsxRefIdentifiers.has(resolvedName):
            case isInitializedFromRef(context, resolvedName, context.sourceCode.getScope(node.object)):
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
          const refName = resolvedName;
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

        // Report refs passed to non-hook functions during render
        for (const { node } of refPassedToFunctions) {
          const boundary = Traverse.findParent(node, isCompOrHookFn);
          if (boundary == null) continue;
          if (Traverse.findParent(node, Check.isFunction) !== boundary) continue;

          context.report({
            messageId: "refPassedToFunction",
            node,
          });
        }
      },
      // Track simple variable aliases: const alias = ref;
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.init == null) return;
        const id = node.id;
        const init = Extract.unwrap(node.init);
        if (id.type !== AST.Identifier || init.type !== AST.Identifier) return;
        aliases.set(id.name, init.name);
      },
    },
  );
}
