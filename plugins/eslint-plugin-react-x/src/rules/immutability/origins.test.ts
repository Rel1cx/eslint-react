import { type TestRuleContext, collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { describe, expect, it } from "vitest";

import { getText } from "@eslint-react/eslint";
import {
  classifyFrozenOrigin,
  getStateHookName,
  isComponentPropsDefinition,
  isInitializedFromCall,
  isInitializedFromUseRef,
  isRefLikeChain,
  resolveToFunctionNode,
  resolveVariableOrigin,
} from "./origins";

function getVariable(context: TestRuleContext, program: TSESTree.Program, name: string, index = 0) {
  const refs = findIdentifierReferences(program, name);
  const ref = refs.at(index) ?? refs.at(-1);
  if (ref == null) throw new Error(`No reference to "${name}" found`);
  const variable = findVariable(context.sourceCode.getScope(ref), ref);
  if (variable == null) throw new Error(`No variable for "${name}" found`);
  return variable;
}

function findCall(context: TestRuleContext, program: TSESTree.Program, textPrefix: string) {
  const call = collectNodes<TSESTree.CallExpression>(program, AST.CallExpression).find((node) => getText(context, node).startsWith(textPrefix));
  if (call == null) throw new Error(`No call starting with "${textPrefix}" found`);
  return call;
}

function findMember(context: TestRuleContext, program: TSESTree.Program, text: string) {
  const member = collectNodes<TSESTree.MemberExpression>(program, AST.MemberExpression).find((node) => getText(context, node) === text);
  if (member == null) throw new Error(`No member expression "${text}" found`);
  return member;
}

function findComponents(program: TSESTree.Program) {
  return collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration);
}

describe("resolveVariableOrigin", () => {
  it("should follow a chain of identifier-initializer aliases", () => {
    const code = "function f() { const source = {}; const a = source; const b = a; sink(b); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "b", -1);
      return resolveVariableOrigin(context, variable).name;
    });
    expect(fact).toBe("source");
  });

  it("should stop at a plain alias in binding mode", () => {
    const code = "function f() { const source = {}; const b = source; sink(b); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "b", -1);
      return resolveVariableOrigin(context, variable, "binding").name;
    });
    expect(fact).toBe("b");
  });

  it("should follow a destructured binding in binding mode", () => {
    const code = "function f(props) { const { error } = props; sink(error); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "error", -1);
      return resolveVariableOrigin(context, variable, "binding").name;
    });
    expect(fact).toBe("props");
  });

  it("should stop at a non-identifier initializer", () => {
    const code = "function f() { const a = make(); sink(a); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "a", -1);
      return resolveVariableOrigin(context, variable).name;
    });
    expect(fact).toBe("a");
  });

  it("should stop when the initializer identifier cannot be resolved", () => {
    const code = "function f() { const a = missing; sink(a); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "a", -1);
      return resolveVariableOrigin(context, variable).name;
    });
    expect(fact).toBe("a");
  });

  it("should terminate on cyclic aliases", () => {
    const code = "function f() { const a = b; const b = a; sink(a); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "a", -1);
      return resolveVariableOrigin(context, variable).name;
    });
    expect(fact).toBe("a");
  });
});

describe("resolveToFunctionNode", () => {
  it("should return an inline function expression unchanged", () => {
    const code = "const f = () => {};";
    const fact = runInRule(code, (context, program) => {
      const arrow = getFirstArrow(program);
      return resolveToFunctionNode(context, arrow) === arrow;
    });
    expect(fact).toBe(true);
  });

  it("should resolve the identifier of a function declaration", () => {
    const code = "function f() {} f();";
    const fact = runInRule(code, (context, program) => {
      const ref = findIdentifierReferences(program, "f").at(-1);
      if (ref == null) throw new Error('No reference to "f" found');
      return resolveToFunctionNode(context, ref)?.type;
    });
    expect(fact).toBe(AST.FunctionDeclaration);
  });

  it("should resolve a chain of variable-declarator aliases", () => {
    const code = "const f = () => {}; const g = f; g();";
    const fact = runInRule(code, (context, program) => {
      const ref = findIdentifierReferences(program, "g").at(-1);
      if (ref == null) throw new Error('No reference to "g" found');
      return resolveToFunctionNode(context, ref)?.type;
    });
    expect(fact).toBe(AST.ArrowFunctionExpression);
  });

  it("should not resolve an unresolvable identifier", () => {
    const code = "missing();";
    const fact = runInRule(code, (context, program) => {
      const ref = findIdentifierReferences(program, "missing").at(-1);
      if (ref == null) throw new Error('No reference to "missing" found');
      return resolveToFunctionNode(context, ref);
    });
    expect(fact).toBeNull();
  });

  it("should not resolve an identifier initialized with a non-function value", () => {
    const code = "const n = 1; n;";
    const fact = runInRule(code, (context, program) => {
      const ref = findIdentifierReferences(program, "n").at(-1);
      if (ref == null) throw new Error('No reference to "n" found');
      return resolveToFunctionNode(context, ref);
    });
    expect(fact).toBeNull();
  });

  it("should not resolve a function returned by a call", () => {
    const code = "function make() {} const f = make(); f();";
    const fact = runInRule(code, (context, program) => {
      const ref = findIdentifierReferences(program, "f").at(-1);
      if (ref == null) throw new Error('No reference to "f" found');
      return resolveToFunctionNode(context, ref);
    });
    expect(fact).toBeNull();
  });
});

describe("isComponentPropsDefinition", () => {
  it("should match the first parameter of a listed component", () => {
    const code = "function C(props) { return props; }";
    const fact = runInRule(code, (context, program) => {
      const def = getVariable(context, program, "props").defs.at(0);
      if (def == null) throw new Error("No definition found");
      return isComponentPropsDefinition(def, findComponents(program));
    });
    expect(fact).toBe(true);
  });

  it("should not match the first parameter when the function is not listed as a component", () => {
    const code = "function C(props) { return props; }";
    const fact = runInRule(code, (context, program) => {
      const def = getVariable(context, program, "props").defs.at(0);
      if (def == null) throw new Error("No definition found");
      return isComponentPropsDefinition(def, []);
    });
    expect(fact).toBe(false);
  });

  it("should match a binding destructured from the first parameter", () => {
    const code = "function C({ x }) { return x; }";
    const fact = runInRule(code, (context, program) => {
      const def = getVariable(context, program, "x").defs.at(0);
      if (def == null) throw new Error("No definition found");
      return isComponentPropsDefinition(def, findComponents(program));
    });
    expect(fact).toBe(true);
  });

  it("should not match the second parameter of a component", () => {
    const code = "function C(a, b) { return b; }";
    const fact = runInRule(code, (context, program) => {
      const def = getVariable(context, program, "b").defs.at(0);
      if (def == null) throw new Error("No definition found");
      return isComponentPropsDefinition(def, findComponents(program));
    });
    expect(fact).toBe(false);
  });

  it("should not match a non-parameter definition", () => {
    const code = "function C() { const props = {}; return props; }";
    const fact = runInRule(code, (context, program) => {
      const def = getVariable(context, program, "props").defs.at(0);
      if (def == null) throw new Error("No definition found");
      return isComponentPropsDefinition(def, findComponents(program));
    });
    expect(fact).toBe(false);
  });
});

describe("getStateHookName", () => {
  it("should recognize a useState call", () => {
    const fact = runInRule("const [a] = useState();", (context, program) => {
      return getStateHookName(context, findCall(context, program, "useState"));
    });
    expect(fact).toBe("useState");
  });

  it("should recognize a namespace useState call", () => {
    const fact = runInRule("const [a] = React.useState();", (context, program) => {
      return getStateHookName(context, findCall(context, program, "React.useState"));
    });
    expect(fact).toBe("useState");
  });

  it("should recognize a useReducer call", () => {
    const fact = runInRule("const [s] = useReducer(reducer, 0);", (context, program) => {
      return getStateHookName(context, findCall(context, program, "useReducer"));
    });
    expect(fact).toBe("useReducer");
  });

  it("should recognize a namespace useReducer call", () => {
    const fact = runInRule("const [s] = React.useReducer(reducer, 0);", (context, program) => {
      return getStateHookName(context, findCall(context, program, "React.useReducer"));
    });
    expect(fact).toBe("useReducer");
  });

  it("should not recognize other hook calls", () => {
    const fact = runInRule("const m = useMemo(() => 1, []);", (context, program) => {
      return getStateHookName(context, findCall(context, program, "useMemo"));
    });
    expect(fact).toBeNull();
  });

  it("should not recognize a non-hook call", () => {
    const fact = runInRule("const v = foo();", (context, program) => {
      return getStateHookName(context, findCall(context, program, "foo"));
    });
    expect(fact).toBeNull();
  });
});

describe("isInitializedFromCall", () => {
  const isMakeStoreCall = (node: TSESTree.CallExpression) => {
    return node.callee.type === AST.Identifier && node.callee.name === "makeStore";
  };

  it("should match a member expression whose root is initialized by a matching call", () => {
    const code = "function f() { const s = makeStore(); sink(s.value); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "s.value"), isMakeStoreCall);
    });
    expect(fact).toBe(true);
  });

  it("should match through a longer member chain", () => {
    const code = "function f() { const s = makeStore(); sink(s.a.b); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "s.a.b"), isMakeStoreCall);
    });
    expect(fact).toBe(true);
  });

  it("should match through an identifier alias", () => {
    const code = "function f() { const s = makeStore(); const t = s; sink(t.value); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "t.value"), isMakeStoreCall);
    });
    expect(fact).toBe(true);
  });

  it("should not match when the predicate rejects the initializer call", () => {
    const code = "function f() { const s = other(); sink(s.value); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "s.value"), isMakeStoreCall);
    });
    expect(fact).toBe(false);
  });

  it("should not match when the root is not initialized by a call", () => {
    const code = "function f() { const s = {}; sink(s.value); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "s.value"), isMakeStoreCall);
    });
    expect(fact).toBe(false);
  });

  it("should not match when the root identifier cannot be resolved", () => {
    const code = "function f() { sink(missing.value); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromCall(context, findMember(context, program, "missing.value"), isMakeStoreCall);
    });
    expect(fact).toBe(false);
  });
});

describe("isInitializedFromUseRef", () => {
  it("should match a member expression rooted at a useRef binding", () => {
    const code = "function f() { const r = useRef(null); sink(r.current); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromUseRef(context, findMember(context, program, "r.current"));
    });
    expect(fact).toBe(true);
  });

  it("should match through an alias of a useRef binding", () => {
    const code = "function f() { const r = useRef(null); const a = r; sink(a.current); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromUseRef(context, findMember(context, program, "a.current"));
    });
    expect(fact).toBe(true);
  });

  it("should not match a binding initialized by another call", () => {
    const code = "function f() { const r = createRef(); sink(r.current); }";
    const fact = runInRule(code, (context, program) => {
      return isInitializedFromUseRef(context, findMember(context, program, "r.current"));
    });
    expect(fact).toBe(false);
  });
});

describe("isRefLikeChain", () => {
  it("should match a chain with a ref-like name", () => {
    const code = "function f() { sink(fooRef.current); }";
    const fact = runInRule(code, (context, program) => {
      return isRefLikeChain(context, findMember(context, program, "fooRef.current"));
    });
    expect(fact).toBe(true);
  });

  it("should match a chain rooted at a useRef binding even without a ref-like name", () => {
    const code = "function f() { const r = useRef(null); sink(r.current); }";
    const fact = runInRule(code, (context, program) => {
      return isRefLikeChain(context, findMember(context, program, "r.current"));
    });
    expect(fact).toBe(true);
  });

  it("should not match a plain member chain", () => {
    const code = "function f() { const o = {}; sink(o.current); }";
    const fact = runInRule(code, (context, program) => {
      return isRefLikeChain(context, findMember(context, program, "o.current"));
    });
    expect(fact).toBe(false);
  });
});

describe("classifyFrozenOrigin", () => {
  it("should classify the props parameter of a component", () => {
    const code = "function C(props) { sink(props); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "props");
      return classifyFrozenOrigin(context, variable, findComponents(program));
    });
    expect(fact).toEqual({ kind: "props", name: "props" });
  });

  it("should not classify the parameter of a function that is not a component", () => {
    const code = "function helper(props) { sink(props); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "props");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should classify a binding destructured from props", () => {
    const code = "function C({ items }) { sink(items); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "items");
      return classifyFrozenOrigin(context, variable, findComponents(program));
    });
    expect(fact).toEqual({ kind: "props", name: "items" });
  });

  it("should classify the state element of a useState destructuring", () => {
    const code = "function f() { const [data, setData] = useState(); sink(data); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "data");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "state", name: "data", hook: "useState" });
  });

  it("should not classify the setter element of a useState destructuring", () => {
    const code = "function f() { const [data, setData] = useState(); sink(setData); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "setData");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should classify a useReducer state value", () => {
    const code = "function f() { const [state, dispatch] = useReducer(reducer, 0); sink(state); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "state");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "state", name: "state", hook: "useReducer" });
  });

  it("should classify an alias of a state value", () => {
    const code = "function f() { const [data] = useState(); const alias = data; sink(alias); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "alias");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "state", name: "data", hook: "useState" });
  });

  it("should not classify a whole-tuple binding of a state hook", () => {
    const code = "function f() { const tuple = useState(); sink(tuple); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "tuple");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should classify an object shallow copy of a state value", () => {
    const code = "function f() { const [items] = useState(); const copy = { ...items }; sink(copy); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "copy");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "shallow-copy", name: "copy", original: "items" });
  });

  it("should classify an array shallow copy of a state value", () => {
    const code = "function f() { const [items] = useState(); const copy = [...items]; sink(copy); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "copy");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "shallow-copy", name: "copy", original: "items" });
  });

  it("should not classify a shallow copy of a non-frozen value", () => {
    const code = "function f() { const local = {}; const copy = { ...local }; sink(copy); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "copy");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should classify a for-of iterator over a state collection", () => {
    const code = "function f() { const [items] = useState(); for (const item of items) { sink(item); } }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "item");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "iterator", name: "item", original: "items" });
  });

  it("should classify a for-of iterator over a member expression rooted at props", () => {
    const code = "function C(props) { for (const item of props.items) { sink(item); } }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "item");
      return classifyFrozenOrigin(context, variable, findComponents(program));
    });
    expect(fact).toEqual({ kind: "iterator", name: "item", original: "props" });
  });

  it("should classify a nested for-of iterator through its frozen parent iterator", () => {
    const code = "function f() { const [items] = useState(); for (const item of items) { for (const sub of item.children) { sink(sub); } } }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "sub");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toEqual({ kind: "iterator", name: "sub", original: "item" });
  });

  it("should not classify a for-of iterator over a non-frozen collection", () => {
    const code = "function f() { const items = []; for (const item of items) { sink(item); } }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "item");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should not classify a for-in loop variable", () => {
    const code = "function f() { const [items] = useState(); for (const key in items) { sink(key); } }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "key");
      return classifyFrozenOrigin(context, variable, []);
    });
    expect(fact).toBeNull();
  });

  it("should not fold a plain alias into its frozen source in binding mode", () => {
    const code = "function C(props) { const current = props; sink(current); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "current");
      return classifyFrozenOrigin(context, variable, findComponents(program), "binding");
    });
    expect(fact).toBeNull();
  });

  it("should fold a destructured binding into its frozen source in binding mode", () => {
    const code = "function C(props) { const { error } = props; sink(error); }";
    const fact = runInRule(code, (context, program) => {
      const variable = getVariable(context, program, "error");
      return classifyFrozenOrigin(context, variable, findComponents(program), "binding");
    });
    expect(fact).toEqual({ kind: "props", name: "props" });
  });
});

function getFirstArrow(program: TSESTree.Program) {
  const arrow = collectNodes<TSESTree.ArrowFunctionExpression>(program, AST.ArrowFunctionExpression).at(0);
  if (arrow == null) throw new Error("No arrow function found");
  return arrow;
}
