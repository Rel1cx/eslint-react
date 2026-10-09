import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Extract from "./extract";
import { Class as InspectableClass, type Inspectable } from "./inspect";
import type { TSESTreeUnwrapped } from "./tree";

/**
 * The minimal context a view needs, structurally compatible with `RuleContext`.
 * Only required by getters that fall back to source text.
 */
export interface ViewContext {
  sourceCode: {
    getText(node: TSESTree.Node): string;
  };
}

/**
 * The structured, non-circular representation of a view used for logging,
 * serialization, and Node.js inspection. Unlike the wrapped node, it is always
 * safe to `JSON.stringify` — TSESTree nodes are circular via `parent`.
 */
export interface ViewJSON {
  /** The node type (ex: `"CallExpression"`). */
  readonly type: TSESTree.Node["type"];
  /** The view class name (ex: `"CallExpressionView"`). */
  readonly _tag: string;
  /** The node range in the source. */
  readonly range: TSESTree.Range;
  /** The source text of the node, present only when a context was provided. */
  readonly text?: string;
}

/**
 * The contract shared by all node views, consumed as `View.View`.
 *
 * Declared separately from the base `Class` (consumed as `View.Class`) so
 * consumers can depend on the contract alone, or provide their own
 * implementations, without extending the class. Inspection behavior
 * (`toJSON`, `toString`, Node.js custom inspection) is inherited from the
 * `Inspectable` contract.
 */
export interface View<N extends TSESTree.Node = TSESTree.Node> extends Inspectable {
  /** Optional rule context for getters that need source text. */
  readonly context: ViewContext | undefined;
  /** The original node, as delivered by ESLint. */
  readonly node: N;
  /**
   * A view over the parent node.
   * Deliberately NOT unwrapped: upward walks must see the tree as it is,
   * including any type expression wrappers enclosing this node.
   */
  readonly parent: View | undefined;
  /** Return the structured, non-circular representation of this view. */
  toJSON(): ViewJSON;
}

/**
 * Base class of all node views, consumed as `View.Class`.
 *
 * Serves both as the base class of the specialized views and as the concrete
 * fallback returned by `of()` for node types without a dedicated view.
 *
 * Experimental read-only facade over a `TSESTree` node.
 *
 * Views expose only getter accessors. Accessors that read a child node return
 * a view over that node, created via `of()` with the view's context passed
 * down, and with type and chain expressions unwrapped where the accessor's
 * semantics call for it. Views never modify or copy the tree, so the
 * underlying nodes keep their identity and remain usable with `===`
 * comparisons, scope analysis, WeakMap caches, and `context.report`; the
 * original node stays reachable via `.node`.
 */
export class Class<N extends TSESTree.Node = TSESTree.Node> extends InspectableClass implements View<N> {
  /** Optional rule context for getters that need source text. */
  readonly context: ViewContext | undefined;
  /** The original node, as delivered by ESLint. */
  readonly node: N;

  /**
   * A view over the parent node.
   * Deliberately NOT unwrapped: upward walks must see the tree as it is,
   * including any type expression wrappers enclosing this node.
   */
  get parent(): View | undefined {
    return this.node.parent == null ? undefined : of(this.node.parent, this.context);
  }

  constructor(node: N, context?: ViewContext) {
    super();
    this.node = node;
    this.context = context;
  }

  /** Return the structured, non-circular representation of this view. */
  toJSON(): ViewJSON {
    const text = this.context?.sourceCode.getText(this.node);
    return {
      _tag: this.constructor.name,
      ...(text == null ? {} : { text }),
      type: this.node.type,
      range: this.node.range,
    };
  }
}

/** View over a call expression. */
export class CallExpressionView extends Class<TSESTree.CallExpression> {
  /** Views over the arguments, each with type and chain expressions unwrapped. */
  get arguments(): View<TSESTreeUnwrapped<TSESTree.CallExpressionArgument>>[] {
    return this.node.arguments.map((argument) => of(Extract.unwrap(argument), this.context));
  }

  /** A view over the callee with type and chain expressions unwrapped. */
  get callee(): View<TSESTreeUnwrapped<TSESTree.CallExpression["callee"]>> {
    return of(Extract.unwrap(this.node.callee), this.context);
  }

  /** The statically determinable callee name (ex: `"useState"`), or `null`. */
  get calleeName(): string | null {
    return Extract.getCalleeName(this.node);
  }
}

/** View over a `new` expression. */
export class NewExpressionView extends Class<TSESTree.NewExpression> {
  /** Views over the arguments, each with type and chain expressions unwrapped. */
  get arguments(): View<TSESTreeUnwrapped<TSESTree.CallExpressionArgument>>[] {
    return this.node.arguments.map((argument) => of(Extract.unwrap(argument), this.context));
  }

  /** A view over the callee with type and chain expressions unwrapped. */
  get callee(): View<TSESTreeUnwrapped<TSESTree.NewExpression["callee"]>> {
    return of(Extract.unwrap(this.node.callee), this.context);
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
  get object(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.object), this.context);
  }

  /** A view over the property with type and chain expressions unwrapped. */
  get property(): View<TSESTreeUnwrapped<TSESTree.MemberExpression["property"]>> {
    return of(Extract.unwrap(this.node.property), this.context);
  }
}

/** View over an assignment expression. */
export class AssignmentExpressionView extends Class<TSESTree.AssignmentExpression> {
  /** A view over the assignment target with type and chain expressions unwrapped. */
  get left(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.left), this.context);
  }

  /** A view over the assigned value with type and chain expressions unwrapped. */
  get right(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.right), this.context);
  }
}

/** Base view over binary-like expressions sharing `left`/`right` operands. */
export class BinaryLikeView<N extends TSESTree.BinaryExpression | TSESTree.LogicalExpression> extends Class<N> {
  /** A view over the left operand with type and chain expressions unwrapped. */
  get left(): View<TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["left"]>> {
    return of(Extract.unwrap(this.node.left), this.context);
  }

  /** A view over the right operand with type and chain expressions unwrapped. */
  get right(): View<TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["right"]>> {
    return of(Extract.unwrap(this.node.right), this.context);
  }
}

/** View over a binary expression. */
export class BinaryExpressionView extends BinaryLikeView<TSESTree.BinaryExpression> {}

/** View over a logical expression. */
export class LogicalExpressionView extends BinaryLikeView<TSESTree.LogicalExpression> {}

/** View over a conditional expression. */
export class ConditionalExpressionView extends Class<TSESTree.ConditionalExpression> {
  /** A view over the alternate with type and chain expressions unwrapped. */
  get alternate(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.alternate), this.context);
  }

  /** A view over the consequent with type and chain expressions unwrapped. */
  get consequent(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.consequent), this.context);
  }

  /** A view over the test with type and chain expressions unwrapped. */
  get test(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.test), this.context);
  }
}

/** View over an expression statement. */
export class ExpressionStatementView extends Class<TSESTree.ExpressionStatement> {
  /** A view over the expression with type and chain expressions unwrapped. */
  get expression(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.expression), this.context);
  }
}

/** View over a return statement. */
export class ReturnStatementView extends Class<TSESTree.ReturnStatement> {
  /** A view over the argument with type and chain expressions unwrapped, or `null` for bare `return`. */
  get argument(): View<TSESTreeUnwrapped<TSESTree.Expression>> | null {
    return this.node.argument == null ? null : of(Extract.unwrap(this.node.argument), this.context);
  }
}

/** View over a throw statement. */
export class ThrowStatementView extends Class<TSESTree.ThrowStatement> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.argument), this.context);
  }
}

/** View over a unary expression. */
export class UnaryExpressionView extends Class<TSESTree.UnaryExpression> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.argument), this.context);
  }
}

/** View over an await expression. */
export class AwaitExpressionView extends Class<TSESTree.AwaitExpression> {
  /** A view over the argument with type and chain expressions unwrapped. */
  get argument(): View<TSESTreeUnwrapped<TSESTree.Expression>> {
    return of(Extract.unwrap(this.node.argument), this.context);
  }
}

/** View over a variable declarator. */
export class VariableDeclaratorView extends Class<TSESTree.VariableDeclarator> {
  /** A view over the initializer with type and chain expressions unwrapped, or `null` when absent. */
  get init(): View<TSESTreeUnwrapped<TSESTree.Expression>> | null {
    return this.node.init == null ? null : of(Extract.unwrap(this.node.init), this.context);
  }
}

/** View over an object literal property. */
export class PropertyView extends Class<TSESTree.Property> {
  /** A view over the key with type and chain expressions unwrapped. */
  get key(): View<TSESTreeUnwrapped<TSESTree.Property["key"]>> {
    return of(Extract.unwrap(this.node.key), this.context);
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
  get value(): View<TSESTreeUnwrapped<TSESTree.Property["value"]>> {
    return of(Extract.unwrap(this.node.value), this.context);
  }
}

/** View over a JSX expression container. */
export class JSXExpressionContainerView extends Class<TSESTree.JSXExpressionContainer> {
  /** A view over the expression with type and chain expressions unwrapped. */
  get expression(): View<TSESTreeUnwrapped<TSESTree.JSXExpressionContainer["expression"]>> {
    return of(Extract.unwrap(this.node.expression), this.context);
  }
}

/**
 * Create the most specific view for a node.
 * Node types without a dedicated view get an instance of the base `Class`.
 * @param node The node to wrap. The tree is never modified or copied.
 * @param context Optional rule context for getters that need source text.
 * @returns A view whose getters return views over the node's children.
 */
export function of(node: TSESTree.AssignmentExpression, context?: ViewContext): AssignmentExpressionView;
export function of(node: TSESTree.AwaitExpression, context?: ViewContext): AwaitExpressionView;
export function of(node: TSESTree.BinaryExpression, context?: ViewContext): BinaryExpressionView;
export function of(node: TSESTree.CallExpression, context?: ViewContext): CallExpressionView;
export function of(node: TSESTree.ConditionalExpression, context?: ViewContext): ConditionalExpressionView;
export function of(node: TSESTree.ExpressionStatement, context?: ViewContext): ExpressionStatementView;
export function of(node: TSESTree.JSXExpressionContainer, context?: ViewContext): JSXExpressionContainerView;
export function of(node: TSESTree.LogicalExpression, context?: ViewContext): LogicalExpressionView;
export function of(node: TSESTree.MemberExpression, context?: ViewContext): MemberExpressionView;
export function of(node: TSESTree.NewExpression, context?: ViewContext): NewExpressionView;
export function of(node: TSESTree.Property, context?: ViewContext): PropertyView;
export function of(node: TSESTree.ReturnStatement, context?: ViewContext): ReturnStatementView;
export function of(node: TSESTree.ThrowStatement, context?: ViewContext): ThrowStatementView;
export function of(node: TSESTree.UnaryExpression, context?: ViewContext): UnaryExpressionView;
export function of(node: TSESTree.VariableDeclarator, context?: ViewContext): VariableDeclaratorView;
export function of<N extends TSESTree.Node>(node: N, context?: ViewContext): View<N>;
export function of(node: TSESTree.Node, context?: ViewContext): View {
  switch (node.type) {
    case AST.AssignmentExpression:
      return new AssignmentExpressionView(node, context);
    case AST.AwaitExpression:
      return new AwaitExpressionView(node, context);
    case AST.BinaryExpression:
      return new BinaryExpressionView(node, context);
    case AST.CallExpression:
      return new CallExpressionView(node, context);
    case AST.ConditionalExpression:
      return new ConditionalExpressionView(node, context);
    case AST.ExpressionStatement:
      return new ExpressionStatementView(node, context);
    case AST.JSXExpressionContainer:
      return new JSXExpressionContainerView(node, context);
    case AST.LogicalExpression:
      return new LogicalExpressionView(node, context);
    case AST.MemberExpression:
      return new MemberExpressionView(node, context);
    case AST.NewExpression:
      return new NewExpressionView(node, context);
    case AST.Property:
      return new PropertyView(node, context);
    case AST.ReturnStatement:
      return new ReturnStatementView(node, context);
    case AST.ThrowStatement:
      return new ThrowStatementView(node, context);
    case AST.UnaryExpression:
      return new UnaryExpressionView(node, context);
    case AST.VariableDeclarator:
      return new VariableDeclaratorView(node, context);
    default:
      return new Class(node, context);
  }
}
