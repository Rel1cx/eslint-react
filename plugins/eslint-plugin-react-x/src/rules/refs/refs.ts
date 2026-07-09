import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";
import { getRefCurrentNullCheckBranch, isFunctionExpressionLike, isInNullCheckTest, isInitializedFromRef, isNestedRefCurrentWrite, resolveAlias } from "./lib";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "readDuringRender"
  | "writeDuringRender"
  | "refPassedToFunction"
  | "duplicateRefInit";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      duplicateRefInit:
        "Ref is initialized more than once during render. Only a single 'if (ref.current == null)' initialization is allowed; move any additional initialization into an effect or event handler.",
      readDuringRender: "Cannot access refs during render",
      refPassedToFunction: "Passing a ref to a function may read its value during render",
      writeDuringRender: "Cannot update ref during render",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

/**
 * Phase 2 (part): compute the set of functions that are "reached" during render for a given
 * component/hook boundary. A function is reached if it is the boundary itself, or if it is
 * directly called (possibly through a simple variable alias, e.g. `const b = a; b();`) from
 * somewhere that is itself reached. This lets us detect ref mutations/reads that happen inside
 * a helper function which is invoked synchronously during render (see "Ref Mutation in Called
 * Function" in refs.spec.md), as opposed to functions that are merely defined and handed off
 * to be called later (e.g. event handlers, effect callbacks).
 */
function computeReachedFunctions(
  boundary: TSESTreeFunction,
  isCompOrHookFn: (n: TSESTree.Node) => n is TSESTreeFunction,
  functionVarBindings: Map<string, TSESTreeFunction>,
  directCallSites: { calleeName: string; node: TSESTree.CallExpression }[],
  aliases: Map<string, string>,
): Set<TSESTreeFunction> {
  const reached = new Set<TSESTreeFunction>([boundary]);
  const relevantCalls = directCallSites.filter((c) => Traverse.findParent(c.node, isCompOrHookFn) === boundary);

  let changed = true;
  for (let iterations = 0; changed && iterations < 50; iterations++) {
    changed = false;
    for (const { calleeName, node: callNode } of relevantCalls) {
      const hostFn = Traverse.findParent(callNode, Check.isFunction) ?? boundary;
      if (!reached.has(hostFn)) continue;
      const resolvedName = resolveAlias(calleeName, aliases);
      const target = functionVarBindings.get(resolvedName);
      if (target == null || reached.has(target)) continue;
      if (Traverse.findParent(target, isCompOrHookFn) !== boundary) continue;
      reached.add(target);
      changed = true;
    }
  }

  return reached;
}

/**
 * Phase 2 (part): determine whether a ref access node is reached unconditionally during render,
 * i.e. every function boundary between the access and the component/hook `boundary` is itself
 * a function that gets invoked during render (see `computeReachedFunctions`).
 */
function isReachedDuringRender(
  node: TSESTree.Node,
  boundary: TSESTreeFunction,
  reached: Set<TSESTreeFunction>,
  alwaysReached: Set<TSESTreeFunction>,
): boolean {
  let current = node.parent;
  while (current != null && current !== boundary) {
    if (Check.isFunction(current) && !reached.has(current) && !alwaysReached.has(current)) return false;
    current = current.parent;
  }
  return true;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
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

  // Phase 1: variables bound directly to a function value, e.g. `const setRef = () => {...}`
  const functionVarBindings = new Map<string, TSESTreeFunction>();

  // Phase 2: every call site of the shape `someIdentifier(...)`, used to compute which
  // functions are reached (i.e. invoked) during render
  const directCallSites: { calleeName: string; node: TSESTree.CallExpression }[] = [];

  // Lazy state initializer functions passed directly as useState's first argument; these run
  // synchronously during render, unlike other hook callback arguments (useEffect/useMemo/...).
  const stateInitializerFunctions = new Set<TSESTreeFunction>();

  return merge(
    hc.visitor,
    fc.visitor,
    {
      // Track reassignment aliases: alias = ref; and alias = someFunction;
      // Also tracks functions bound to object properties: object.foo = () => {...};
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.operator !== "=") return;
        const left = Extract.unwrap(node.left);
        const right = Extract.unwrap(node.right);
        if (left.type === AST.MemberExpression) {
          const leftObj = Extract.unwrap(left.object);
          const propName = Extract.getPropertyName(left.property);
          if (leftObj.type === AST.Identifier && propName != null && isFunctionExpressionLike(right)) {
            functionVarBindings.set(`${leftObj.name}.${propName}`, right);
          }
          return;
        }
        if (left.type !== AST.Identifier) return;
        if (right.type === AST.Identifier) {
          aliases.set(left.name, right.name);
          return;
        }
        if (isFunctionExpressionLike(right)) {
          functionVarBindings.set(left.name, right);
        }
      },
      // Track refs passed to non-hook function calls
      CallExpression(node: TSESTree.CallExpression) {
        const callee = Extract.unwrap(node.callee);
        const calleeName = callee.type === AST.Identifier
          ? callee.name
          : callee.type === AST.MemberExpression
          ? Extract.getPropertyName(callee.property)
          : null;
        // Phase 2: record every direct call site (`identifier(...)` or `object.prop(...)`),
        // regardless of what it is, so we can later determine which locally-defined functions
        // (including ones bound to object properties) are reached during render.
        if (callee.type === AST.Identifier) {
          directCallSites.push({ calleeName: callee.name, node });
        } else if (callee.type === AST.MemberExpression) {
          const calleeObj = Extract.unwrap(callee.object);
          if (calleeObj.type === AST.Identifier && calleeName != null) {
            directCallSites.push({ calleeName: `${calleeObj.name}.${calleeName}`, node });
          }
        }
        // The initializer function passed directly as useState's first argument runs
        // synchronously during render (unlike other hook callback arguments, e.g.
        // useEffect/useMemo/useCallback), so ref accesses inside it aren't shielded.
        if (calleeName === "useState") {
          const [firstArg] = node.arguments;
          if (firstArg != null) {
            const unwrappedFirstArg = Extract.unwrap(firstArg);
            if (isFunctionExpressionLike(unwrappedFirstArg)) {
              stateInitializerFunctions.add(unwrappedFirstArg);
            }
          }
        }
        if (calleeName != null && (calleeName.startsWith("use") || calleeName === "mergeRefs" || calleeName === "render")) return;
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
            const isDirectWrite = match(parent)
              .with({ type: AST.AssignmentExpression }, (p) => p.left === node || Extract.unwrap(p.left) === node)
              .with({ type: AST.UpdateExpression }, (p) => p.argument === node || Extract.unwrap(p.argument) === node)
              .otherwise(() => false);
            // Nested property write, e.g. `ref.current.inner = value` or `ref.current.inner++`
            return isDirectWrite || isNestedRefCurrentWrite(node);
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

        // Phase 2: cache the set of functions reached during render, per component/hook boundary
        const reachedCache = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
        function getReached(boundary: TSESTreeFunction): Set<TSESTreeFunction> {
          let reached = reachedCache.get(boundary);
          if (reached == null) {
            reached = computeReachedFunctions(boundary, isCompOrHookFn, functionVarBindings, directCallSites, aliases);
            reachedCache.set(boundary, reached);
          }
          return reached;
        }

        // Phase 4: track, per boundary, which refs have already had a single null-guarded
        // initialization recorded (see "Duplicate ref initialization" in refs.spec.md)
        const lazyInitSeen = new Map<TSESTreeFunction, Set<string>>();

        for (const { isWrite, node } of refAccesses) {
          const obj = Extract.unwrap(node.object);

          // A ref-like base is usually a plain identifier (`ref.current`), but can also be a
          // member expression whose property looks like a ref (`props.ref.current`)
          let refName: string | null = null;
          if (obj.type === AST.Identifier) {
            const resolvedName = resolveAlias(obj.name, aliases);
            switch (true) {
              case resolvedName === "ref" || resolvedName.endsWith("Ref"):
              case jsxRefIdentifiers.has(resolvedName):
              case isInitializedFromRef(context, resolvedName, context.sourceCode.getScope(node.object)):
                refName = resolvedName;
                break;
              default:
                continue;
            }
          } else if (obj.type === AST.MemberExpression) {
            const propName = Extract.getPropertyName(obj.property);
            if (propName == null || (propName !== "ref" && !propName.endsWith("Ref"))) continue;
            // Lazy-init guard detection below needs a simple identifier ref name, which this
            // shape doesn't have; every access through it is therefore treated as immediate.
          } else {
            continue;
          }

          // Find the enclosing component or hook function
          const boundary = Traverse.findParent(node, isCompOrHookFn);

          // Not inside a component or hook - could be a ref used in a non-React function, which is fine
          if (boundary == null) continue;

          // Phase 2: skip only when some function between this access and the boundary is never
          // actually invoked during render (e.g. an event handler or effect callback); functions
          // that are called synchronously during render do not shield accesses inside them.
          if (!isReachedDuringRender(node, boundary, getReached(boundary), stateInitializerFunctions)) continue;

          //
          // Standard:
          //   if (ref.current === null) { ref.current = value; }
          //
          // Inverted (with early return):
          //   if (ref.current !== null) { return ...; }
          //   ref.current = computeValue();
          //
          // Only a direct write is a valid lazy initialization inside the branch guaranteed to
          // see `ref.current` as null - any other use (read, function call, ...) of the
          // provably-null value is still reported. Inside the other branch (value already set),
          // reading the memoized value back is allowed, but writing there is not.
          let isLazyInit = refName != null && isInNullCheckTest(node);
          let matchedGuardIf = false;
          if (!isLazyInit && refName != null) {
            let current: TSESTree.Node = node.parent;
            let prevChild: TSESTree.Node = node;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            findLoop: while (true) {
              if (current.type === AST.IfStatement) {
                const nullBranch = getRefCurrentNullCheckBranch(current.test, refName);
                const actualBranch = current.consequent === prevChild
                  ? "consequent"
                  : current.alternate === prevChild
                  ? "alternate"
                  : null;
                if (nullBranch != null && actualBranch != null) {
                  matchedGuardIf = true;
                  isLazyInit = actualBranch === nullBranch ? isWrite : !isWrite;
                }
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
                  break findLoop;
              }
              prevChild = current;
              current = current.parent;
            }
          }

          if (!isLazyInit && isWrite && refName != null) {
            let stmt: TSESTree.Node = node;
            while (stmt.parent != null && stmt.parent.type !== AST.BlockStatement) {
              stmt = stmt.parent;
            }
            if (stmt.parent?.type === AST.BlockStatement) {
              const block = stmt.parent;
              // tsl-ignore dx/no-unsafe-as
              const stmtIdx = block.body.indexOf(stmt as TSESTree.Statement);
              if (stmtIdx >= 0) {
                for (let i = stmtIdx - 1; i >= 0; i--) {
                  const sibling = block.body[i];
                  if (sibling == null) continue;
                  if (sibling.type === AST.IfStatement && getRefCurrentNullCheckBranch(sibling.test, refName) === "alternate") {
                    isLazyInit = true;
                    break;
                  }
                }
              }
            }
          }

          // Phase 4: a null-guarded write is only allowed once per ref within a given
          // component/hook; any further guarded write to the same ref is a duplicate init.
          if (isLazyInit && matchedGuardIf && isWrite && refName != null) {
            const seen = lazyInitSeen.get(boundary) ?? new Set<string>();
            lazyInitSeen.set(boundary, seen);
            if (seen.has(refName)) {
              context.report({ messageId: "duplicateRefInit", node });
              continue;
            }
            seen.add(refName);
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
          if (!isReachedDuringRender(node, boundary, getReached(boundary), stateInitializerFunctions)) continue;

          context.report({
            messageId: "refPassedToFunction",
            node,
          });
        }
      },
      // Track simple variable aliases: const alias = ref; and function bindings: const fn = () => {...};
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.init == null) return;
        const id = node.id;
        if (id.type !== AST.Identifier) return;
        const init = Extract.unwrap(node.init);
        if (init.type === AST.Identifier) {
          aliases.set(id.name, init.name);
          return;
        }
        if (isFunctionExpressionLike(init)) {
          functionVarBindings.set(id.name, init);
        }
      },
    },
  );
}
