import * as ast from "@eslint-react/ast";
import { type SemanticNode, isInitializedFromReact } from "@eslint-react/core";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

// --- Types ---

export interface ClassComponentSemanticNode extends SemanticNode {
  id: null | TSESTree.BindingName;
  kind: "class-component";
  node: ast.TSESTreeClass;
  flag: bigint;
  hint: bigint;
  methods: ast.TSESTreeMethodOrProperty[];
  displayName: null | TSESTree.Expression;
}

// --- Component Flags ---

export const ComponentFlag = {
  None: 0n,
  PureComponent: 1n << 0n,
} as const;

// --- Class Component Detection ---

export function isClassComponent(node: TSESTree.Node): node is ast.TSESTreeClass;
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is ast.TSESTreeClass;
export function isClassComponent(node: TSESTree.Node, context?: RuleContext): node is ast.TSESTreeClass {
  if ("superClass" in node && node.superClass != null) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        if (!re.test(node.superClass.name)) return false;
        if (context == null) return true;
        return isInitializedFromReact(node.superClass.name, context.sourceCode.getScope(node), "react");
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        if (!re.test(node.superClass.property.name)) return false;
        if (context == null) return true;
        if (node.superClass.object.type === AST.Identifier) {
          return isInitializedFromReact(node.superClass.object.name, context.sourceCode.getScope(node), "react");
        }
        return true;
    }
  }
  return false;
}

export function isPureComponent(node: TSESTree.Node) {
  if ("superClass" in node && node.superClass != null) {
    const re = /^PureComponent$/u;
    switch (true) {
      case node.superClass.type === AST.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === AST.MemberExpression
        && node.superClass.property.type === AST.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}

// --- Lifecycle Method Checkers ---

function createLifecycleChecker(methodName: string, isStatic = false) {
  return (node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty => (
    ast.isMethodOrProperty(node)
    && node.static === isStatic
    && node.key.type === AST.Identifier
    && node.key.name === methodName
  );
}

export const isRender = createLifecycleChecker("render");
export const isComponentDidCatch = createLifecycleChecker("componentDidCatch");
export const isComponentDidMount = createLifecycleChecker("componentDidMount");
export const isComponentDidUpdate = createLifecycleChecker("componentDidUpdate");
export const isComponentWillMount = createLifecycleChecker("componentWillMount");
export const isComponentWillReceiveProps = createLifecycleChecker("componentWillReceiveProps");
export const isComponentWillUnmount = createLifecycleChecker("componentWillUnmount");
export const isComponentWillUpdate = createLifecycleChecker("componentWillUpdate");
export const isGetChildContext = createLifecycleChecker("getChildContext");
export const isGetInitialState = createLifecycleChecker("getInitialState");
export const isGetSnapshotBeforeUpdate = createLifecycleChecker("getSnapshotBeforeUpdate");
export const isShouldComponentUpdate = createLifecycleChecker("shouldComponentUpdate");
export const isUnsafeComponentWillMount = createLifecycleChecker("UNSAFE_componentWillMount");
export const isUnsafeComponentWillReceiveProps = createLifecycleChecker("UNSAFE_componentWillReceiveProps");
export const isUnsafeComponentWillUpdate = createLifecycleChecker("UNSAFE_componentWillUpdate");

export const isGetDefaultProps = createLifecycleChecker("getDefaultProps", true);
export const isGetDerivedStateFromProps = createLifecycleChecker("getDerivedStateFromProps", true);
export const isGetDerivedStateFromError = createLifecycleChecker("getDerivedStateFromError", true);

// --- Render Method Detection ---

export function isRenderMethodLike(node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && ast.isOneOf([AST.ClassDeclaration, AST.ClassExpression])(node.parent.parent);
}

// --- Component Lifecycle Callbacks ---

export function isComponentDidMountCallback(node: TSESTree.Node) {
  return ast.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

export function isComponentWillUnmountCallback(node: TSESTree.Node) {
  return ast.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}

// --- State Helpers ---

export function isThisSetStateCall(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === AST.MemberExpression
    && ast.isThisExpressionLoose(callee.object)
    && callee.property.type === AST.Identifier
    && callee.property.name === "setState"
  );
}

export function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;
  return left.type === AST.MemberExpression
    && ast.isThisExpressionLoose(left.object)
    && ast.getPropertyName(left.property) === "state";
}

// --- Component Collector Legacy ---

const idGen = new IdGenerator("class-component:");

export declare namespace getComponentCollectorLegacy {
  type ReturnType = {
    api: {
      getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

export function getComponentCollectorLegacy(context: RuleContext): getComponentCollectorLegacy.ReturnType {
  const components = new Map<string, ClassComponentSemanticNode>();

  const api = {
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const collect = (node: ast.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = ast.getClassId(node);
    const key = idGen.next();
    const name = id == null ? null : ast.getFullyQualifiedName(id, getText);
    const flag = isPureComponent(node)
      ? ComponentFlag.PureComponent
      : ComponentFlag.None;
    components.set(
      key,
      {
        id,
        key,
        kind: "class-component",
        name,
        displayName: null,
        flag,
        hint: 0n,
        methods: [],
        node,
      },
    );
  };

  const visitor = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { api, visitor } as const;
}
