import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";

/** Require `onChange` or `readOnly` when using `checked` on `<input>`. */
export function checkedRequiresOnchangeOrReadonly(): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (name !== "input") return;
      const attrs = new Set<string>();
      for (const attr of node.attributes) {
        if (attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier") {
          attrs.add(attr.name.name);
        }
      }
      if (!attrs.has("checked")) return;
      if (!attrs.has("onChange") && !attrs.has("readOnly")) {
        context.report({
          node,
          message: "`checked` requires `onChange` or `readOnly`.",
        });
      }
    },
  });
}

/** Disallow defining components or hooks inside other functions (factory pattern). */
export function componentHookFactories(): RuleDefinition {
  function findParent({ parent }: TSESTree.Node, test: (n: TSESTree.Node) => boolean): TSESTree.Node | null {
    if (parent == null) return null;
    if (test(parent)) return parent;
    if (parent.type === "Program") return null;
    return findParent(parent, test);
  }

  function isFunction({ type }: TSESTree.Node) {
    return type === "FunctionDeclaration" || type === "FunctionExpression" || type === "ArrowFunctionExpression";
  }

  return (context, { collect }) => {
    const fc = collect.components(context);
    const hk = collect.hooks(context);
    return merge(
      fc.visitor,
      hk.visitor,
      {
        "Program:exit"(program) {
          const comps = fc.query.all(program);
          const hooks = hk.query.all(program);
          for (const { name, node, kind } of [...comps, ...hooks]) {
            if (name == null) continue;
            if (findParent(node, isFunction) == null) continue;
            context.report({
              node,
              message: `Don't define ${kind} "${name}" inside a function. Move it to the module level.`,
            });
          }
        },
      },
    );
  };
}

/** Options for {@link forbidComponentProps}. */
export type ForbidComponentPropsOptions = {
  /** Prop names that are not allowed on React components. */
  forbidden: string[];
};

/** Forbid certain props on React components (not DOM elements). */
export function forbidComponentProps({ forbidden }: ForbidComponentPropsOptions): RuleDefinition {
  return (context) => ({
    JSXAttribute(node) {
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;
      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;
      const elemName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;
      // Only report on components (PascalCase names), not DOM elements
      if (elemName == null || elemName[0] !== elemName[0]?.toUpperCase()) return;
      context.report({
        node,
        message: `Prop "${propName}" is forbidden on components.`,
      });
    },
  });
}

/** Options for {@link forbidDomProps}. */
export type ForbidDomPropsOptions = {
  /** Prop names that are not allowed on DOM elements. */
  forbidden: string[];
};

/** Forbid certain props on DOM elements (not React components). */
export function forbidDomProps({ forbidden }: ForbidDomPropsOptions): RuleDefinition {
  return (context) => ({
    JSXAttribute(node) {
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;
      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;
      const elemName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;
      // Only report on DOM elements (lowercase names), not components
      if (elemName == null || elemName[0] !== elemName[0]?.toLowerCase()) return;
      context.report({
        node,
        message: `Prop "${propName}" is forbidden on DOM elements.`,
      });
    },
  });
}

/** Options for {@link forbidElements}. */
export type ForbidElementsOptions = {
  /** A map from element name to the error message reported when that element is used. */
  forbidden: Map<string, string>;
};

/** Forbid specific JSX elements. */
export function forbidElements({ forbidden }: ForbidElementsOptions): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (name != null && forbidden.has(name)) {
        context.report({ node, message: forbidden.get(name)! });
      }
    },
  });
}

/** Enforce arrow function definitions for function components. */
export function functionComponentDefinition(): RuleDefinition {
  return (context, { collect, hint }) => {
    const { query, visitor } = collect.components(context, {
      hint: hint.component.Default & ~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
    });
    return merge(
      visitor,
      {
        "Program:exit"(program) {
          for (const { node } of query.all(program)) {
            if (node.type === "ArrowFunctionExpression") continue;
            context.report({
              node,
              message: "Function components must be defined with arrow functions.",
              suggest: [
                {
                  desc: "Convert to arrow function.",
                  fix(fixer) {
                    const src = context.sourceCode;
                    if (node.generator) return null;
                    const prefix = node.async ? "async " : "";
                    const typeParams = node.typeParameters ? src.getText(node.typeParameters) : "";
                    const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                    const returnType = node.returnType ? src.getText(node.returnType) : "";
                    const body = src.getText(node.body);

                    // function Foo(params) { ... } -> const Foo = (params) => { ... };
                    if (node.type === "FunctionDeclaration" && node.id) {
                      // dprint-ignore
                      return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                    }

                    // const Foo = function(params) { ... } -> const Foo = (params) => { ... }
                    if (node.type === "FunctionExpression" && node.parent.type === "VariableDeclarator") {
                      // dprint-ignore
                      return fixer.replaceText(node, `${prefix}${typeParams}${params}${returnType} => ${body}`);
                    }

                    // { Foo(params) { ... } } -> { Foo: (params) => { ... } }
                    if (node.type === "FunctionExpression" && node.parent.type === "Property") {
                      // dprint-ignore
                      return fixer.replaceText(node.parent, `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`);
                    }

                    return null;
                  },
                },
              ],
            });
          }
        },
      },
    );
  };
}

/** Enforce shorthand for boolean JSX attributes. */
export function jsxBooleanValue(): RuleDefinition {
  return (context) => ({
    JSXAttribute(node) {
      const { value } = node;
      if (value?.type !== "JSXExpressionContainer") return;
      if (value.expression.type !== "Literal" || value.expression.value !== true) return;
      context.report({
        node,
        message: "Omit the value for boolean attributes.",
        fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
      });
    },
  });
}

/** Options for {@link jsxFragments}. */
export type JsxsFragmentsOptions = {
  /** The mode to enforce: "syntax" (default, shorthand) or "element" (standard form). */
  mode?: "syntax" | "element";
};

/** Enforce shorthand or standard form for React fragments. */
export function jsxFragments({ mode = "syntax" }: JsxsFragmentsOptions = {}): RuleDefinition {
  return (context) => {
    function reportSyntaxPreferred(node: TSESTree.JSXOpeningElement, pattern: "React.Fragment" | "Fragment") {
      const hasAttributes = node.attributes.length > 0;
      if (hasAttributes) return;
      context.report({
        node,
        message: `Use shorthand fragment syntax '<>...</>' instead of '<${pattern}>...</${pattern}'.`,
        fix(fixer) {
          const closing = node.parent?.closingElement;
          if (!closing) return null;
          return [fixer.replaceText(node, "<>"), fixer.replaceText(closing, "</>")];
        },
      });
    }

    return {
      JSXOpeningElement(node) {
        const name = node.name;

        // Handle standalone <Fragment> (JSXIdentifier)
        if (name.type === "JSXIdentifier" && name.name === "Fragment") {
          if (mode === "syntax") {
            reportSyntaxPreferred(node, "Fragment");
          }
          return;
        }

        // Handle <React.Fragment> (JSXMemberExpression)
        if (name.type !== "JSXMemberExpression") return;
        if (name.object.type !== "JSXIdentifier" || name.object.name !== "React") return;
        if (name.property.type !== "JSXIdentifier" || name.property.name !== "Fragment") return;

        if (mode === "syntax") {
          reportSyntaxPreferred(node, "React.Fragment");
        }
      },
      JSXFragment(node) {
        if (mode === "element") {
          context.report({
            node,
            message: "Use '<React.Fragment>...</React.Fragment>' instead of shorthand '<>...</>'.",
            fix(fixer) {
              return [
                fixer.replaceText(node.openingFragment, "<React.Fragment>"),
                fixer.replaceText(node.closingFragment, "</React.Fragment>"),
              ];
            },
          });
        }
      },
    };
  };
}

/** Options for {@link jsxHandlerNames}. */
export type JsxHandlerNamesOptions = {
  /** Prefix for event handler functions (default: "handle"). */
  eventHandlerPrefix?: string;
  /** Prefix for event handler props (default: "on"). */
  eventHandlerPropPrefix?: string;
  /** Whether to check inline functions (default: false). */
  checkInlineFunction?: boolean;
};

/** Enforce naming convention for JSX event handlers. */
export function jsxHandlerNames({
  eventHandlerPrefix = "handle",
  eventHandlerPropPrefix = "on",
  checkInlineFunction = false,
}: JsxHandlerNamesOptions = {}): RuleDefinition {
  const EVENT_HANDLER_REGEX = new RegExp(`^${eventHandlerPropPrefix}[A-Z]`);
  const HANDLER_FUNC_REGEX = new RegExp(`^${eventHandlerPrefix}[A-Z]`);

  return (context) => ({
    JSXAttribute(node) {
      if (node.name.type !== "JSXIdentifier") return;
      const propName = node.name.name;
      if (!EVENT_HANDLER_REGEX.test(propName)) return;

      const value = node.value;
      if (!value) return;

      if (value.type === "JSXExpressionContainer") {
        const expression = value.expression;

        if (expression.type === "Identifier") {
          const handlerName = expression.name;
          if (!HANDLER_FUNC_REGEX.test(handlerName)) {
            context.report({
              node: expression,
              message: `Handler function "${handlerName}" should be named "${eventHandlerPrefix}${
                propName.slice(eventHandlerPropPrefix.length)
              }..."`,
            });
          }
          return;
        }

        if (expression.type === "ArrowFunctionExpression" || expression.type === "FunctionExpression") {
          if (checkInlineFunction) {
            context.report({
              node: expression,
              message:
                `Inline function handlers are not allowed for "${propName}". Extract it to a named "${eventHandlerPrefix}${
                  propName.slice(eventHandlerPropPrefix.length)
                }" function.`,
            });
          }
          return;
        }
      }
    },
  });
}

/** Options for {@link jsxMaxDepth}. */
export type JsxMaxDepthOptions = {
  /** Maximum allowed depth for JSX elements. */
  max: number;
};

/** Enforce JSX maximum depth. */
export function jsxMaxDepth({ max }: JsxMaxDepthOptions): RuleDefinition {
  return (context) => ({
    JSXElement(node) {
      let depth = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parent: any = node.parent;
      while (parent) {
        if (parent.type === "JSXElement") {
          depth++;
        }
        parent = parent.parent;
      }
      if (depth > max) {
        context.report({
          node,
          message: `JSX element exceeds maximum depth of ${max} (found ${depth}).`,
        });
      }
    },
  });
}

/** Prevent inline functions and `.bind()` in JSX props. */
export function jsxNoBind(): RuleDefinition {
  return (context) => ({
    JSXAttribute(node) {
      const value = node.value;
      if (value?.type !== "JSXExpressionContainer") return;
      switch (true) {
        case value.expression.type === "ArrowFunctionExpression":
        case value.expression.type === "FunctionExpression":
          context.report({ node, message: "JSX props should not use inline functions." });
          break;
        case value.expression.type === "CallExpression"
          && value.expression.callee.type === "MemberExpression"
          && value.expression.callee.property.type === "Identifier"
          && value.expression.callee.property.name === "bind":
          context.report({ node, message: "JSX props should not use .bind()." });
          break;
      }
    },
  });
}

/** Options for {@link jsxNoDuplicateProps}. */
export type JsxNoDuplicatePropsOptions = {
  /** Whether to ignore case when checking for duplicate props. */
  ignoreCase?: boolean;
};

/** Disallow duplicate properties in JSX. */
export function jsxNoDuplicateProps({ ignoreCase = false }: JsxNoDuplicatePropsOptions = {}): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const seen = new Map<string, string>();
      for (const attr of node.attributes) {
        if (attr.type !== "JSXAttribute") continue;
        if (attr.name.type !== "JSXIdentifier") continue;
        const name = ignoreCase ? attr.name.name.toLowerCase() : attr.name.name;
        if (seen.has(name)) {
          context.report({
            node: attr,
            message: `Duplicate prop "${attr.name.name}" found.`,
          });
        } else {
          seen.set(name, attr.name.name);
        }
      }
    },
  });
}

/** Options for {@link jsxNoLiterals}. */
export type JsxNoLiteralsOptions = {
  /** Enforces no string literals used as children, wrapped or unwrapped. */
  noStrings?: boolean;
  /** An array of unique string values that would otherwise warn, but will be ignored. */
  allowedStrings?: string[];
  /** When `true` the rule ignores literals used in props. */
  ignoreProps?: boolean;
};

/** Disallow usage of string literals in JSX. */
export function jsxNoLiterals(
  { noStrings = false, allowedStrings = [], ignoreProps = true }: JsxNoLiteralsOptions = {},
): RuleDefinition {
  const allowedSet = new Set(allowedStrings);
  return (context) => ({
    Literal(node) {
      if (typeof node.value !== "string") return;
      const text = node.value.trim();
      if (text === "" || allowedSet.has(text)) return;

      const parent = node.parent;
      if (!parent) return;

      if (parent.type === "JSXAttribute") {
        if (!ignoreProps) {
          context.report({
            node,
            message: `String literals are not allowed in JSX props. Use {'${text}'} instead.`,
          });
        }
        return;
      }

      if (parent.type === "JSXExpressionContainer") return;

      if (parent.type === "JSXElement" || parent.type === "JSXFragment") {
        if (noStrings) {
          context.report({
            node,
            message: `String literals are not allowed as JSX children.`,
          });
        } else {
          context.report({
            node,
            message: `String literals should be wrapped in JSX expression: {'${text}'}`,
          });
        }
      }
    },
    JSXText(node) {
      const text = node.value.trim();
      if (text === "" || allowedSet.has(text)) return;

      if (noStrings) {
        context.report({
          node,
          message: `String literals are not allowed as JSX children.`,
        });
      } else {
        context.report({
          node,
          message: `String literals should be wrapped in JSX expression: {'${text}'}`,
        });
      }
    },
  });
}

/** Options for {@link jsxPascalCase}. */
export type JsxPascalCaseOptions = {
  /** Allow all-uppercase component names like `<XML />`. */
  allowAllCaps?: boolean;
  /** Allow leading underscores in component names like `<_Component />`. */
  allowLeadingUnderscore?: boolean;
};

/** Enforce PascalCase for user-defined JSX components. */
export function jsxPascalCase(
  { allowAllCaps = false, allowLeadingUnderscore = false }: JsxPascalCaseOptions = {},
): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name;
      if (name.type !== "JSXIdentifier") return;

      const componentName = name.name;

      // Check for leading underscore (before lowercase check since "_".toLowerCase() === "_")
      if (componentName.startsWith("_")) {
        if (!allowLeadingUnderscore) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should not start with an underscore.`,
          });
        }
        return;
      }

      // Ignore DOM elements (lowercase first letter)
      const firstChar = componentName[0];
      if (firstChar === undefined) return;
      if (firstChar === firstChar.toLowerCase()) return;

      // Check for all caps
      if (componentName === componentName.toUpperCase()) {
        if (!allowAllCaps) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should use PascalCase, not all uppercase.`,
          });
        }
        return;
      }

      // Check PascalCase: first letter uppercase, rest can be mixed but no underscores
      const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;
      if (!pascalCaseRegex.test(componentName)) {
        context.report({
          node: name,
          message: `Component name "${componentName}" should be in PascalCase.`,
        });
      }
    },
  });
}

/** Disallow JSX prop spreading the same identifier multiple times. */
export function jsxPropsNoSpreadMulti(): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const seen = new Set<string>();
      for (const attr of node.attributes) {
        if (attr.type !== "JSXSpreadAttribute") continue;

        let spreadKey: string;
        if (attr.argument.type === "Identifier") {
          spreadKey = attr.argument.name;
        } else {
          spreadKey = context.sourceCode.getText(attr.argument);
        }

        if (seen.has(spreadKey)) {
          context.report({
            node: attr,
            message: `Spreading the same expression "${spreadKey}" multiple times is not allowed.`,
          });
        } else {
          seen.add(spreadKey);
        }
      }
    },
  });
}

/** Disallow JSX props spreading. */
export function jsxPropsNoSpreading(): RuleDefinition {
  return (context) => ({
    JSXSpreadAttribute(node) {
      context.report({
        node,
        message: "Props spreading is not allowed.",
      });
    },
  });
}

/** Options for {@link maxComponentPerFile}. */
export type MaxComponentPerFileOptions = {
  /** The maximum number of components allowed per file. */
  max: number;
};

/** Prevent defining more than one component per file. */
export function maxComponentPerFile({ max }: MaxComponentPerFileOptions): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);
    return merge(visitor, {
      "Program:exit"(program) {
        const components = query.all(program);
        for (const { node, name } of components.slice(max)) {
          context.report({
            node,
            message: `Declare only ${max} component${max !== 1 ? "s" : ""} per file. Found extra component "${
              name ?? "anonymous"
            }".`,
          });
        }
      },
    });
  };
}

/** Disallow adjacent inline elements not separated by whitespace. */
export function noAdjacentInlineElements(): RuleDefinition {
  /** Set of inline HTML elements. */
  const INLINE_ELEMENTS = new Set([
    "a",
    "abbr",
    "acronym",
    "b",
    "bdi",
    "bdo",
    "big",
    "br",
    "cite",
    "code",
    "dfn",
    "em",
    "i",
    "img",
    "input",
    "kbd",
    "label",
    "map",
    "object",
    "q",
    "samp",
    "script",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "textarea",
    "time",
    "tt",
    "var",
  ]);

  return (context) => ({
    JSXElement(node) {
      const children = node.children;
      for (let i = 0; i < children.length - 1; i++) {
        const current = children[i];
        const next = children[i + 1];

        if (current?.type !== "JSXElement") continue;
        if (current.openingElement.name.type !== "JSXIdentifier") continue;
        const currentName = current.openingElement.name.name;
        if (!INLINE_ELEMENTS.has(currentName)) continue;

        if (next?.type !== "JSXElement") continue;
        if (next.openingElement.name.type !== "JSXIdentifier") continue;
        const nextName = next.openingElement.name.name;
        if (!INLINE_ELEMENTS.has(nextName)) continue;

        context.report({
          node: current,
          message: `Adjacent inline elements "${currentName}" and "${nextName}" should be separated by whitespace.`,
        });
      }
    },
  });
}

/** Prevent defining more than one component per file. */
export function noMultiComp(): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);
    return merge(visitor, {
      "Program:exit"(program) {
        const components = query.all(program);
        for (const { node, name } of components.slice(1)) {
          context.report({
            node,
            message: `Declare only one component per file. Found extra component "${name ?? "anonymous"}".`,
          });
        }
      },
    });
  };
}

/** Warn on custom hooks that don't call other hooks. */
export function noUnnecessaryUsePrefix(): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.hooks(context);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const hook of query.all(program)) {
          if (hook.hookCalls.length === 0) {
            context.report({
              node: hook.node,
              message:
                `Custom hook "${hook.name}" doesn't call any hooks. A custom hook should use at least one hook, otherwise it's just a regular function.`,
            });
          }
        }
      },
    });
  };
}

/** Require the project to use a specific React version. */
export function version(major = "19"): RuleDefinition {
  return (context, { settings }) => ({
    Program(program) {
      if (!settings.version.startsWith(`${major}.`)) {
        context.report({
          node: program,
          message: `This project requires React ${major}, but detected version ${settings.version}.`,
        });
      }
    },
  });
}

/** Detect circular dependencies between useEffect hooks via useState setters. */
export function noCircularEffect(): RuleDefinition {
  return (context, { is, settings }) => {
    // Map: setter Scope.Variable → state Scope.Variable
    const setterToState = new Map<Scope.Variable, Scope.Variable>();

    // Pending useEffect-like calls to process at Program:exit
    const pendingEffects: TSESTree.CallExpression[] = [];

    return {
      CallExpression(node: TSESTree.CallExpression) {
        // 1. Register useState pairs
        if (is.useStateLikeCall(node, settings.additionalStateHooks)) {
          const { parent } = node;
          if (
            parent.type === "VariableDeclarator"
            && parent.id.type === "ArrayPattern"
          ) {
            const [stateEl, setterEl] = parent.id.elements;
            if (stateEl?.type === "Identifier" && setterEl?.type === "Identifier") {
              const scope = context.sourceCode.getScope(node);
              const stateVar = findVariable(scope, stateEl.name);
              const setterVar = findVariable(scope, setterEl.name);
              if (stateVar != null && setterVar != null) {
                setterToState.set(setterVar, stateVar);
              }
            }
          }
          return;
        }

        // 2. Collect useEffect-like calls
        if (is.useEffectLikeCall(node, settings.additionalEffectHooks)) {
          pendingEffects.push(node);
        }
      },

      "Program:exit"() {
        interface EffectEdge {
          deps: Scope.Variable[];
          targets: Scope.Variable[];
          node: TSESTree.CallExpression;
        }

        const stateVars = new Set(setterToState.values());
        const edges: EffectEdge[] = [];

        for (const node of pendingEffects) {
          const callback = node.arguments[0];
          const depsArg = node.arguments[1];
          if (callback == null || depsArg == null) continue;

          // Extract dependency state variables from the deps array
          const deps: Scope.Variable[] = [];
          if (depsArg.type === "ArrayExpression") {
            for (const el of depsArg.elements) {
              if (el?.type === "Identifier") {
                const scope = context.sourceCode.getScope(el);
                const v = findVariable(scope, el.name);
                if (v != null && stateVars.has(v)) {
                  deps.push(v);
                }
              }
            }
          }
          if (deps.length === 0) continue;

          // Find setter calls inside the callback body
          const targets: Scope.Variable[] = [];
          const [cbStart, cbEnd] = callback.range;
          for (const [setterVar, stateVar] of setterToState) {
            for (const ref of setterVar.references) {
              const [refStart, refEnd] = ref.identifier.range;
              if (refStart < cbStart || refEnd > cbEnd) continue;
              const { parent } = ref.identifier;
              if (
                parent?.type === "CallExpression"
                && parent.callee === ref.identifier
              ) {
                targets.push(stateVar);
                break;
              }
            }
          }
          if (targets.length === 0) continue;

          edges.push({ deps, targets, node });
        }

        // Build a directed graph: stateVar → Set<stateVar>
        // If an effect depends on A and sets B, add edge A → B
        const graph = new Map<Scope.Variable, Set<Scope.Variable>>();
        for (const { deps, targets } of edges) {
          for (const dep of deps) {
            for (const target of targets) {
              if (!graph.has(dep)) graph.set(dep, new Set());
              graph.get(dep)!.add(target);
            }
          }
        }

        // Detect cycles via DFS
        const visited = new Set<Scope.Variable>();
        const inStack = new Set<Scope.Variable>();
        const inCycle = new Set<Scope.Variable>();

        function dfs(v: Scope.Variable): boolean {
          if (inStack.has(v)) return true;
          if (visited.has(v)) return false;
          visited.add(v);
          inStack.add(v);
          let foundCycle = false;
          for (const neighbor of graph.get(v) ?? []) {
            if (dfs(neighbor)) {
              inCycle.add(v);
              inCycle.add(neighbor);
              foundCycle = true;
            }
          }
          inStack.delete(v);
          return foundCycle;
        }

        for (const v of graph.keys()) dfs(v);
        if (inCycle.size === 0) return;

        // Report each effect that participates in a cycle
        for (const { deps, targets, node } of edges) {
          const cycleDeps = deps.filter((d) => inCycle.has(d));
          const cycleTargets = targets.filter((t) => inCycle.has(t));
          if (cycleDeps.length === 0 || cycleTargets.length === 0) continue;

          const depNames = cycleDeps.map((d) => d.name).join(", ");
          const targetNames = cycleTargets.map((t) => t.name).join(", ");
          context.report({
            node,
            message:
              `Circular effect detected: this effect depends on [${depNames}] and updates [${targetNames}], creating an infinite update loop.`,
          });
        }
      },
    };
  };
}
