import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { constVoid, getOrElseUpdate, not, unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { findVariable } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import { match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "set-state-in-effect";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

type CallKind =
  | "useEffect"
  | "useState"
  | "setState"
  | "then"
  | "other";

type FunctionKind =
  | "setup"
  | "cleanup"
  | "deferred"
  | "immediate"
  | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against setting state synchronously in an effect, which can lead to re-renders that degrade performance.",
    },
    messages: {
      default:
        "Do not call the 'set' function '{{name}}' of 'useState' synchronously in an effect. This can lead to unnecessary re-renders and performance issues.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const { additionalStateHooks } = getSettingsFromContext(context);
  const functionEntries: { kind: FunctionKind; node: ast.TSESTreeFunction }[] = [];
  const setupFnRef: { current: ast.TSESTreeFunction | null } = { current: null };
  const setupFnIds: TSESTree.Identifier[] = [];

  const trackedFnCalls: TSESTree.CallExpression[] = [];
  const setStateCallsByFn = new WeakMap<ast.TSESTreeFunction, TSESTree.CallExpression[]>();
  const setStateInEffectArg = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInHookCallbacks = new WeakMap<TSESTree.Node, TSESTree.CallExpression[]>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  const onSetupFunctionEnter = (node: ast.TSESTreeFunction) => {
    setupFnRef.current = node;
  };

  const onSetupFunctionExit = (node: ast.TSESTreeFunction) => {
    if (setupFnRef.current === node) {
      setupFnRef.current = null;
    }
  };

  function isThenCall(node: TSESTree.CallExpression) {
    return node.callee.type === AST.MemberExpression
      && node.callee.property.type === AST.Identifier
      && node.callee.property.name === "then";
  }

  function isUseStateCall(node: TSESTree.Node) {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isUseEffectSetupCallback(node: TSESTree.Node) {
    return node.parent?.type === AST.CallExpression
      && node.parent.callee !== node
      && core.isUseEffectLikeCall(node.parent);
  }

  function getCallName(node: TSESTree.Node) {
    if (node.type === AST.CallExpression) {
      return ast.getFullyQualifiedName(node.callee, getText);
    }
    return ast.getFullyQualifiedName(node, getText);
  }

  function getCallKind(node: TSESTree.CallExpression) {
    return match<TSESTree.CallExpression, CallKind>(node)
      .when(isUseStateCall, () => "useState")
      .when(core.isUseEffectLikeCall, () => "useEffect")
      .when(isSetStateCall, () => "setState")
      .when(isThenCall, () => "then")
      .otherwise(() => "other");
  }

  function getFunctionKind(node: ast.TSESTreeFunction) {
    const parent = ast.findParentNode(node, not(ast.isTypeExpression)) ?? node.parent;
    switch (true) {
      case node.async:
      case parent.type === AST.CallExpression
        && isThenCall(parent):
        return "deferred";
      case node.type !== AST.FunctionDeclaration
        && parent.type === AST.CallExpression
        && parent.callee === node:
        return "immediate";
      case isUseEffectSetupCallback(node):
        return "setup";
      default:
        return "other";
    }
  }

  function isIdFromUseStateCall(id: TSESTree.Identifier, at?: number) {
    const variable = findVariable(id, context.sourceCode.getScope(id));
    function resolve(v: typeof variable | unit) {
      if (v == null) return unit;
      const def = v.defs.at(0);
      if (def == null) return unit;
      switch (true) {
        case def.type === DefinitionType.FunctionName
          && def.node.type === AST.FunctionDeclaration:
          return def.node;
        case def.type === DefinitionType.ClassName
          && def.node.type === AST.ClassDeclaration:
          return def.node;
        case "init" in def.node
          && def.node.init != null
          && !("declarations" in def.node.init):
          return def.node.init;
        default:
          return unit;
      }
    }
    const initNode = resolve(variable);
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
      .findIndex((e) => e?.type === AST.Identifier && e.name === id.name) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    switch (node.callee.type) {
      // const data = useState();
      // data.at(1)();
      case AST.CallExpression: {
        const { callee } = node.callee;
        if (callee.type !== AST.MemberExpression) {
          return false;
        }
        if (!("name" in callee.object)) {
          return false;
        }
        const isAt = callee.property.type === AST.Identifier && callee.property.name === "at";
        const [index] = node.callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isIdFromUseStateCall(callee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isIdFromUseStateCall(node.callee, 1);
      }
      // const data = useState();
      // data[1]();
      case AST.MemberExpression: {
        if (!("name" in node.callee.object)) {
          return false;
        }
        const property = node.callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isIdFromUseStateCall(node.callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  function isHookDecl(node: TSESTree.Node): node is TSESTree.VariableDeclarator & { init: TSESTree.CallExpression } {
    if (node.type !== AST.VariableDeclarator) return false;
    if (node.id.type !== AST.Identifier) return false;
    const init = node.init;
    if (init == null || init.type !== AST.CallExpression) return false;
    switch (init.callee.type) {
      case AST.Identifier:
        return core.isHookName(init.callee.name);
      case AST.MemberExpression:
        return init.callee.property.type === AST.Identifier
          && core.isHookName(init.callee.property.name);
      default:
        return false;
    }
  }

  return defineRuleListener(
    {
      ":function"(node: ast.TSESTreeFunction) {
        const kind = getFunctionKind(node);
        functionEntries.push({ kind, node });
        if (kind === "setup") {
          onSetupFunctionEnter(node);
        }
      },
      ":function:exit"(node: ast.TSESTreeFunction) {
        const { kind } = functionEntries.at(-1) ?? {};
        if (kind === "setup") {
          onSetupFunctionExit(node);
        }
        functionEntries.pop();
      },
      CallExpression(node) {
        const setupFunction = setupFnRef.current;
        const entry = functionEntries.at(-1);
        if (entry == null || entry.node.async) {
          return;
        }
        match(getCallKind(node))
          .with("setState", () => {
            switch (true) {
              case entry.kind === "deferred":
              case entry.node.async:
                // do nothing, this is a deferred setState call
                break;
              case entry.node === setupFunction:
              case entry.kind === "immediate"
                && ast.findParentNode(entry.node, ast.isFunction) === setupFunction: {
                const args0 = node.arguments.at(0);
                // setState() without arguments, which is invalid but other tools will report it
                if (args0 == null) return;
                // Check if the setState call is using a ref value, which is safe to use in an effect (e.g. `setState(ref.current.scrollTop)`)
                function isArgumentUsingRefValue(context: RuleContext, node: TSESTree.CallExpressionArgument) {
                  const isUsingRefValue = (n: TSESTree.Node): boolean => {
                    switch (n.type) {
                      case AST.Identifier:
                        return core.isInitializedFromRef(n.name, context.sourceCode.getScope(n));
                      case AST.MemberExpression:
                        return isUsingRefValue(n.object);
                      case AST.CallExpression:
                        return isUsingRefValue(n.callee) || ast.getNestedIdentifiers(n).some(isUsingRefValue);
                      default:
                        return false;
                    }
                  };
                  // Case 1: setState(ref.current.scrollTop);
                  if (isUsingRefValue(node)) return true;
                  // Case 2: setState(() => ref.current.scrollTop);
                  return ast.isFunction(node)
                    && context.sourceCode
                      .getScope(node.body)
                      .references
                      .some((r) => isUsingRefValue(r.identifier));
                }
                if (isArgumentUsingRefValue(context, args0)) return;
                context.report({
                  data: {
                    name: context.sourceCode.getText(node.callee),
                  },
                  messageId: "default",
                  node,
                });
                return;
              }
              default: {
                const init = ast.findParentNode(node, isHookDecl)?.init;
                if (init == null) getOrElseUpdate(setStateCallsByFn, entry.node, () => []).push(node);
                else getOrElseUpdate(setStateInHookCallbacks, init, () => []).push(node);
              }
            }
          })
          .with("useEffect", () => {
            if (ast.isFunction(node.arguments.at(0))) return;
            setupFnIds.push(...ast.getNestedIdentifiers(node));
          })
          .with("other", () => {
            if (entry.node !== setupFunction) return;
            trackedFnCalls.push(node);
          })
          .otherwise(constVoid);
      },
      Identifier(node) {
        if (node.parent.type === AST.CallExpression && node.parent.callee === node) {
          return;
        }
        if (!isIdFromUseStateCall(node, 1)) {
          return;
        }
        switch (node.parent.type) {
          case AST.ArrowFunctionExpression: {
            const parent = node.parent.parent;
            if (parent.type !== AST.CallExpression) {
              break;
            }
            // const [state, setState] = useState();
            // const set = useMemo(() => setState, []);
            // useEffect(set, []);
            if (!core.isUseMemoCall(parent)) {
              break;
            }
            const init = ast.findParentNode(parent, isHookDecl)?.init;
            if (init != null) {
              getOrElseUpdate(setStateInEffectArg, init, () => []).push(node);
            }
            break;
          }
          case AST.CallExpression: {
            if (node !== node.parent.arguments.at(0)) {
              break;
            }
            // const [state, setState] = useState();
            // const set = useCallback(setState, []);
            // useEffect(set, []);
            if (core.isUseCallbackCall(node.parent)) {
              const init = ast.findParentNode(node.parent, isHookDecl)?.init;
              if (init != null) {
                getOrElseUpdate(setStateInEffectArg, init, () => []).push(node);
              }
              break;
            }
            // const [state, setState] = useState();
            // useEffect(setState);
            if (core.isUseEffectLikeCall(node.parent)) {
              getOrElseUpdate(setStateInEffectSetup, node.parent, () => []).push(node);
            }
          }
        }
      },
      "Program:exit"() {
        const getSetStateCalls = (
          id: string | TSESTree.Identifier,
          initialScope: Scope.Scope,
        ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
          function resolve(v: typeof variable | unit) {
            if (v == null) return unit;
            const def = v.defs.at(0);
            if (def == null) return unit;
            if ("init" in def.node && def.node.init != null && !("declarations" in def.node.init)) {
              return def.node.init;
            }
            return def.node;
          }
          const variable = findVariable(id, initialScope);
          const node = resolve(variable);
          switch (node?.type) {
            case AST.ArrowFunctionExpression:
            case AST.FunctionDeclaration:
            case AST.FunctionExpression:
              return setStateCallsByFn.get(node) ?? [];
            case AST.CallExpression:
              return setStateInHookCallbacks.get(node) ?? setStateInEffectArg.get(node) ?? [];
          }
          return [];
        };
        for (const [, calls] of setStateInEffectSetup) {
          for (const call of calls) {
            context.report({
              data: {
                name: call.name,
              },
              messageId: "default",
              node: call,
            });
          }
        }
        for (const { callee } of trackedFnCalls) {
          if (!("name" in callee)) {
            continue;
          }
          const { name } = callee;
          const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: {
                name: getCallName(setStateCall),
              },
              messageId: "default",
              node: setStateCall,
            });
          }
        }
        for (const id of setupFnIds) {
          const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: {
                name: getCallName(setStateCall),
              },
              messageId: "default",
              node: setStateCall,
            });
          }
        }
      },
    },
  );
}
