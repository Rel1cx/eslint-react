import type { RuleFunction } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

interface EffectNode {
  call: TSESTree.CallExpression;
  reads: Set<string>;
  writes: Set<string>;
}

/** Maps each state setter name to the state variable it updates, from `const [x, setX] = useState(...)` declarations. */
function collectStateSetters(hookCalls: TSESTree.CallExpression[], isStateCall: (node: TSESTree.Node) => boolean): Map<string, string> {
  const setters = new Map<string, string>();
  for (const call of hookCalls) {
    if (!isStateCall(call)) continue;
    const declarator = call.parent;
    if (declarator.type !== "VariableDeclarator" || declarator.id.type !== "ArrayPattern") continue;
    const [state, setter] = declarator.id.elements;
    if (state?.type === "Identifier" && setter?.type === "Identifier") {
      setters.set(setter.name, state.name);
    }
  }
  return setters;
}

/** Builds the "reads" (dependency array) and "writes" (setter calls) state footprint of each `useEffect`-like call. */
function collectEffects(hookCalls: TSESTree.CallExpression[], isEffectCall: (node: TSESTree.Node) => boolean, setters: Map<string, string>): EffectNode[] {
  const effects: EffectNode[] = [];
  for (const call of hookCalls) {
    if (!isEffectCall(call)) continue;
    const [setup, deps] = call.arguments;

    const writes = new Set<string>();
    if (setup?.type === "ArrowFunctionExpression" || setup?.type === "FunctionExpression") {
      simpleTraverse(setup, {
        enter(node) {
          if (node.type !== "CallExpression" || node.callee.type !== "Identifier") return;
          const state = setters.get(node.callee.name);
          if (state != null) writes.add(state);
        },
      });
    }

    const reads = new Set<string>();
    if (deps?.type === "ArrayExpression") {
      for (const element of deps.elements) {
        if (element?.type === "Identifier") reads.add(element.name);
      }
    }

    effects.push({ call, reads, writes });
  }
  return effects;
}

/** Finds cycles in the "effect A's setter feeds effect B's dependency array" graph via DFS. */
function findCycles(effects: EffectNode[]): number[][] {
  const adjacency: number[][] = effects.map((from) =>
    effects.reduce<number[]>((acc, to, j) => {
      if ([...from.writes].some((state) => to.reads.has(state))) acc.push(j);
      return acc;
    }, [])
  );

  const BLACK = 2, GRAY = 1, WHITE = 0;
  const color = new Array<number>(effects.length).fill(WHITE);
  const stack: number[] = [];
  const seen = new Set<string>();
  const cycles: number[][] = [];

  function visit(u: number): void {
    color[u] = GRAY;
    stack.push(u);
    for (const v of adjacency[u] ?? []) {
      if (color[v] === WHITE) {
        visit(v);
        continue;
      }
      if (color[v] !== GRAY) continue;
      const start = stack.indexOf(v);
      const cycle = stack.slice(start);
      const key = [...cycle].sort((a, b) => a - b).join(",");
      if (!seen.has(key)) {
        seen.add(key);
        cycles.push(cycle);
      }
    }
    stack.pop();
    color[u] = BLACK;
  }

  for (let i = 0; i < effects.length; i++) {
    if (color[i] === WHITE) visit(i);
  }

  return cycles;
}

/** Describes a cycle as the chain of state names that connect each effect to the next. */
function describeCycle(effects: EffectNode[], cycle: number[]): string {
  const names = cycle.map((index, position) => {
    const from = effects[index]!;
    const to = effects[cycle[(position + 1) % cycle.length]!]!;
    return [...from.writes].find((state) => to.reads.has(state)) ?? "?";
  });
  return [...names, names[0]].join(" → ");
}

/** Detect circular `set` function and dependency patterns across `useEffect`-like hooks in the same component or hook. */
export function noCircularEffect(): RuleFunction {
  return (context, { collect, is, settings }) => {
    const fc = collect.components(context);
    const hk = collect.hooks(context);

    function check(hookCalls: TSESTree.CallExpression[]) {
      const setters = collectStateSetters(hookCalls, (node) => is.useStateLikeCall(node, settings.additionalStateHooks));
      const effects = collectEffects(hookCalls, (node) => is.useEffectLikeCall(node, settings.additionalEffectHooks), setters);
      if (effects.length === 0) return;

      const reported = new Set<TSESTree.CallExpression>();
      for (const cycle of findCycles(effects)) {
        const description = describeCycle(effects, cycle);
        for (const index of cycle) {
          const { call } = effects[index]!;
          if (reported.has(call)) continue;
          reported.add(call);
          context.report({
            message: `This effect is part of a circular update chain that may cause an infinite render loop: ${description}.`,
            node: call,
          });
        }
      }
    }

    return merge(
      fc.visitor,
      hk.visitor,
      {
        "Program:exit"(program) {
          for (const { hookCalls } of fc.query.all(program)) {
            check(hookCalls.filter((call): call is TSESTree.CallExpression => call.type === "CallExpression"));
          }
          for (const { hookCalls } of hk.query.all(program)) {
            check(hookCalls.filter((call): call is TSESTree.CallExpression => call.type === "CallExpression"));
          }
        },
      },
    );
  };
}
