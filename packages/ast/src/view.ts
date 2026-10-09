import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Extract from "./extract";
import * as Inspectable from "./inspect";
import type { TSESTreeUnwrapped } from "./tree";

/**
 * The contract shared by all node views, consumed as `View.View`.
 *
 * Declared separately from the base `Class` (consumed as `View.Class`) so
 * consumers can depend on the contract alone, or provide their own
 * implementations, without extending the class.
 */
export interface View<N extends TSESTree.Node = TSESTree.Node> {
  /**
   * The node type, identical to `node.type` (ex: `"CallExpression"`).
   * Exposed on the view itself so it reads like the wrapped node and can
   * discriminate a `View | AbsentView` union without touching `.node`.
   */
  readonly type: N["type"];
  /** The original node, as delivered by ESLint. */
  readonly node: N;
  /**
   * A view over the parent node.
   * Deliberately NOT unwrapped: upward walks must see the tree as it is,
   * including any type expression wrappers enclosing this node.
   */
  readonly parent: View | undefined;
}

/**
 * Base class of all node views, consumed as `View.Class`.
 *
 * Serves both as the base class of the specialized views and as the concrete
 * fallback returned by `from()` for node types without a dedicated view.
 *
 * Experimental read-only facade over a `TSESTree` node.
 *
 * Views expose only getter accessors. Accessors that read a child node return
 * a view over that node, created via `from()`, with type and chain expressions
 * unwrapped where the accessor's semantics call for it. Accessors whose child
 * may be absent (ex: the argument of a bare `return`) return an `AbsentView`
 * instead of `null`. Views never modify or copy the tree, so the underlying
 * nodes keep their identity and remain usable with `===` comparisons, scope
 * analysis, WeakMap caches, and `context.report`; the original node stays
 * reachable via `.node`.
 */
export class Class<N extends TSESTree.Node = TSESTree.Node> extends Inspectable.Class implements View<N> {
  /** The original node, as delivered by ESLint. */
  readonly node: N;

  /** {@inheritDoc View.parent} */
  get parent(): View | undefined {
    return this.node.parent == null ? undefined : from(this.node.parent);
  }

  /** {@inheritDoc View.type} */
  get type(): N["type"] {
    return this.node.type;
  }

  constructor(node: N) {
    super();
    this.node = node;
  }

  // TODO: return a structured, non-circular representation of this view.
  toJSON() {
    return {};
  }
}

/**
 * View over the absence of a node, consumed as `View.AbsentView`.
 *
 * A null-object view returned by accessors whose child may be absent (ex: the
 * argument of a bare `return`) and by `from()` when given `null` or `undefined`.
 * It wraps no node: `node`, `type`, and `parent` are always `undefined`.
 * Unlike node views, it is not created from the tree, so there is nothing to
 * unwrap. Use `isAbsentView()` to narrow a `View | AbsentView` union, or
 * compare `type` directly.
 */
export class AbsentView extends Inspectable.Class {
  /** Always `undefined`: an absent view wraps no node. */
  get node(): undefined {
    return undefined;
  }

  /** Always `undefined`: an absent view has no parent. */
  get parent(): undefined {
    return undefined;
  }

  /** Always `undefined`: an absent view wraps no node. */
  get type(): undefined {
    return undefined;
  }

  // TODO: return a structured representation of this absent view.
  toJSON() {
    return {};
  }
}

/**
 * Check whether a view is an absent view.
 * @param view The view to check.
 * @returns `true` when the view wraps no node.
 */
export function isAbsentView(view: View | AbsentView): view is AbsentView {
  return view instanceof AbsentView;
}

/**
 * Create a view over a child node with type and chain expressions unwrapped.
 * `null` and `undefined` get an `AbsentView`.
 */
function child<N extends TSESTree.Node>(node: N): ViewOf<TSESTreeUnwrapped<N>>;
function child<N extends TSESTree.Node>(node: N | null | undefined): AbsentView | ViewOf<TSESTreeUnwrapped<N>>;
function child(node: TSESTree.Node | null | undefined): AbsentView | View {
  return node == null ? new AbsentView() : from(Extract.unwrap(node));
}

/** View over a call expression. */
export class CallExpressionView extends Class<TSESTree.CallExpression> {
  /** Views over the arguments, each with type and chain expressions unwrapped. */
  get arguments(): ViewOf<TSESTreeUnwrapped<TSESTree.CallExpressionArgument>>[] {
    return this.node.arguments.map((argument) => child(argument));
  }

  /** A view over the callee with type and chain expressions unwrapped. */
  get callee(): ViewOf<TSESTreeUnwrapped<TSESTree.CallExpression["callee"]>> {
    return child(this.node.callee);
  }

  /** The statically determinable callee name (ex: `"useState"`), or `null`. */
  get calleeName(): string | null {
    return Extract.getCalleeName(this.node);
  }
}

/** View over a `new` expression. */
export class NewExpressionView extends Class<TSESTree.NewExpression> {
  /** Views over the arguments, each with type and chain expressions unwrapped. */
  get arguments(): ViewOf<TSESTreeUnwrapped<TSESTree.CallExpressionArgument>>[] {
    return this.node.arguments.map((argument) => child(argument));
  }

  /** A view over the callee with type and chain expressions unwrapped. */
  get callee(): ViewOf<TSESTreeUnwrapped<TSESTree.NewExpression["callee"]>> {
    return child(this.node.callee);
  }
}

/** View over a member expression. */
export class MemberExpressionView extends Class<TSESTree.MemberExpression> {
  /**
   * The member chain from the base object (ex: `[a, b, c]` for `a.b.c`).
   * Returns bare nodes, not views: the chain is a derived list, not a child node.
   */
  get memberChain() {
    return Extract.getMemberChain(this.node);
  }

  /** A view over the object with type and chain expressions unwrapped. */
  get object(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.object);
  }

  /** A view over the property with type and chain expressions unwrapped. */
  get property(): ViewOf<TSESTreeUnwrapped<TSESTree.MemberExpression["property"]>> {
    return child(this.node.property);
  }
}

/** View over an assignment expression. */
export class AssignmentExpressionView extends Class<TSESTree.AssignmentExpression> {
  /** A view over the assignment target with type and chain expressions unwrapped. */
  get left(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.left);
  }

  /** A view over the assigned value with type and chain expressions unwrapped. */
  get right(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.right);
  }
}

/** Base view over binary-like expressions sharing `left`/`right` operands. */
export class BinaryLikeView<N extends TSESTree.BinaryExpression | TSESTree.LogicalExpression> extends Class<N> {
  /** A view over the left operand with type and chain expressions unwrapped. */
  get left(): ViewOf<TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["left"]>> {
    return child(this.node.left);
  }

  /** A view over the right operand with type and chain expressions unwrapped. */
  get right(): ViewOf<TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["right"]>> {
    return child(this.node.right);
  }
}

/** View over a binary expression. */
export class BinaryExpressionView extends BinaryLikeView<TSESTree.BinaryExpression> {}

/** View over a logical expression. */
export class LogicalExpressionView extends BinaryLikeView<TSESTree.LogicalExpression> {}

/** View over a conditional expression. */
export class ConditionalExpressionView extends Class<TSESTree.ConditionalExpression> {
  /** A view over the alternate with type and chain expressions unwrapped. */
  get alternate(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.alternate);
  }

  /** A view over the consequent with type and chain expressions unwrapped. */
  get consequent(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.consequent);
  }

  /** A view over the test with type and chain expressions unwrapped. */
  get test(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.test);
  }
}

/** View over an expression statement. */
export class ExpressionStatementView extends Class<TSESTree.ExpressionStatement> {
  /** A view over the expression with type and chain expressions unwrapped. */
  get expression(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.expression);
  }
}

/** View over a return statement. */
export class ReturnStatementView extends Class<TSESTree.ReturnStatement> {
  /** A view over the argument with type and chain expressions unwrapped, or an absent view for a bare `return`. */
  get argument(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> | AbsentView {
    return child(this.node.argument);
  }
}

/** View over a throw statement. */
export class ThrowStatementView extends Class<TSESTree.ThrowStatement> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.argument);
  }
}

/** View over a unary expression. */
export class UnaryExpressionView extends Class<TSESTree.UnaryExpression> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.argument);
  }
}

/** View over an await expression. */
export class AwaitExpressionView extends Class<TSESTree.AwaitExpression> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> {
    return child(this.node.argument);
  }
}

/** View over a variable declarator. */
export class VariableDeclaratorView extends Class<TSESTree.VariableDeclarator> {
  /** A view over the initializer with type and chain expressions unwrapped, or an absent view when absent. */
  get init(): ViewOf<TSESTreeUnwrapped<TSESTree.Expression>> | AbsentView {
    return child(this.node.init);
  }
}

/** View over an object literal property. */
export class PropertyView extends Class<TSESTree.Property> {
  /** A view over the key with type and chain expressions unwrapped. */
  get key(): ViewOf<TSESTreeUnwrapped<TSESTree.Property["key"]>> {
    return child(this.node.key);
  }

  /** The static property name (plain identifier keys only), or `null` when it cannot be statically determined. */
  get name(): string | null {
    return Extract.getPropertyName(this.node);
  }

  /** The static property name, also resolving string literals and simple template literals, or `null`. */
  get nameMax(): string | null {
    return Extract.getPropertyName(this.node, "max");
  }

  /** A view over the value with type and chain expressions unwrapped. */
  get value(): ViewOf<TSESTreeUnwrapped<TSESTree.Property["value"]>> {
    return child(this.node.value);
  }
}

/** View over a JSX expression container. */
export class JSXExpressionContainerView extends Class<TSESTree.JSXExpressionContainer> {
  /** A view over the expression with type and chain expressions unwrapped. */
  get expression(): ViewOf<TSESTreeUnwrapped<TSESTree.JSXExpressionContainer["expression"]>> {
    return child(this.node.expression);
  }
}

/**
 * The most specific view type for a node type `N`, consumed as `View.ViewOf`.
 *
 * Distributive over `N`: when `N` is a union (including `TSESTree.Node`
 * itself), the result is a union of the per-constituent views, each carrying
 * its literal `type`, so a `view.type` check narrows both the view and its
 * `.node`. Node types without a dedicated view map to the base `Class`.
 */
export type ViewOf<N extends TSESTree.Node> = N extends TSESTree.AssignmentExpression ? AssignmentExpressionView
  : N extends TSESTree.AwaitExpression ? AwaitExpressionView
  : N extends TSESTree.BinaryExpression ? BinaryExpressionView
  : N extends TSESTree.CallExpression ? CallExpressionView
  : N extends TSESTree.ConditionalExpression ? ConditionalExpressionView
  : N extends TSESTree.ExpressionStatement ? ExpressionStatementView
  : N extends TSESTree.JSXExpressionContainer ? JSXExpressionContainerView
  : N extends TSESTree.LogicalExpression ? LogicalExpressionView
  : N extends TSESTree.MemberExpression ? MemberExpressionView
  : N extends TSESTree.NewExpression ? NewExpressionView
  : N extends TSESTree.Property ? PropertyView
  : N extends TSESTree.ReturnStatement ? ReturnStatementView
  : N extends TSESTree.ThrowStatement ? ThrowStatementView
  : N extends TSESTree.UnaryExpression ? UnaryExpressionView
  : N extends TSESTree.VariableDeclarator ? VariableDeclaratorView
  : Class<N>;

/**
 * Create the most specific view for a node.
 * Node types without a dedicated view get an instance of the base `Class`;
 * `null` and `undefined` get an `AbsentView`.
 *
 * The return type is a discriminated union over `type`: when the node's type
 * is a union (including `TSESTree.Node` itself), each constituent maps to its
 * own view, so a `view.type` check narrows both the view and its `.node`.
 * @param node The node to wrap. The tree is never modified or copied.
 * @returns A view whose getters return views over the node's children.
 */
export function from(node: null | undefined): AbsentView;
export function from<N extends TSESTree.Node>(node: N): ViewOf<N>;
export function from<N extends TSESTree.Node>(node: N | null | undefined): AbsentView | ViewOf<N>;
export function from(node: TSESTree.Node | null | undefined): AbsentView | View {
  if (node == null) {
    return new AbsentView();
  }
  switch (node.type) {
    case AST.AssignmentExpression:
      return new AssignmentExpressionView(node);
    case AST.AwaitExpression:
      return new AwaitExpressionView(node);
    case AST.BinaryExpression:
      return new BinaryExpressionView(node);
    case AST.CallExpression:
      return new CallExpressionView(node);
    case AST.ConditionalExpression:
      return new ConditionalExpressionView(node);
    case AST.ExpressionStatement:
      return new ExpressionStatementView(node);
    case AST.JSXExpressionContainer:
      return new JSXExpressionContainerView(node);
    case AST.LogicalExpression:
      return new LogicalExpressionView(node);
    case AST.MemberExpression:
      return new MemberExpressionView(node);
    case AST.NewExpression:
      return new NewExpressionView(node);
    case AST.Property:
      return new PropertyView(node);
    case AST.ReturnStatement:
      return new ReturnStatementView(node);
    case AST.ThrowStatement:
      return new ThrowStatementView(node);
    case AST.UnaryExpression:
      return new UnaryExpressionView(node);
    case AST.VariableDeclarator:
      return new VariableDeclaratorView(node);
    default:
      return new Class(node);
  }
}
