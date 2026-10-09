import { type Inspectable, InspectableClass } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Extract from "./extract";
import type { TSESTreeUnwrapped } from "./tree";

/**
 * The minimal context a view needs, structurally compatible with `RuleContext`.
 * Only required by getters that fall back to source text.
 */
export interface NodeViewContext {
  sourceCode: {
    getText(node: TSESTree.Node): string;
  };
}

/**
 * The structured, non-circular representation of a view used for logging,
 * serialization, and Node.js inspection. Unlike the wrapped node, it is always
 * safe to `JSON.stringify` — TSESTree nodes are circular via `parent`.
 */
export interface NodeViewJSON {
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
 * The contract shared by all node views.
 *
 * Declared separately from the `NodeViewBase` class so consumers can depend
 * on the contract alone, or provide their own implementations, without
 * extending the class. Inspection behavior (`toJSON`, `toString`, Node.js
 * custom inspection) is inherited from the `Inspectable` contract.
 */
export interface NodeView<N extends TSESTree.Node = TSESTree.Node> extends Inspectable {
  /** Optional rule context for getters that need source text. */
  readonly context: NodeViewContext | undefined;
  /**
   * Get the parent node.
   * Deliberately NOT unwrapped: upward walks must see the tree as it is,
   * including any type expression wrappers enclosing this node.
   */
  getParent(): TSESTree.Node | undefined;
  /** The original node, as delivered by ESLint. */
  readonly node: N;
  /** Return the structured, non-circular representation of this view. */
  toJSON(): NodeViewJSON;
}

/**
 * Experimental read-only facade over a `TSESTree` node.
 *
 * Views expose only `get*` accessors that return references into the original
 * tree with type and chain expressions unwrapped where the accessor's semantics
 * call for it. They never modify or copy the tree, so returned nodes keep their
 * identity and remain usable with `===` comparisons, scope analysis, WeakMap
 * caches, and `context.report`.
 *
 * Views are an alternative to calling `Extract.unwrap` at each analysis site,
 * not a replacement; the original node stays reachable via `.node`.
 */
export class NodeViewBase<N extends TSESTree.Node = TSESTree.Node> extends InspectableClass implements NodeView<N> {
  /** Optional rule context for getters that need source text. */
  readonly context: NodeViewContext | undefined;
  /** The original node, as delivered by ESLint. */
  readonly node: N;

  constructor(node: N, context?: NodeViewContext) {
    super();
    this.node = node;
    this.context = context;
  }

  /**
   * Get the parent node.
   * Deliberately NOT unwrapped: upward walks must see the tree as it is,
   * including any type expression wrappers enclosing this node.
   */
  getParent(): TSESTree.Node | undefined {
    return this.node.parent;
  }

  /** Return the structured, non-circular representation of this view. */
  toJSON(): NodeViewJSON {
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
export class CallExpressionView extends NodeViewBase<TSESTree.CallExpression> {
  /** Get the arguments with type and chain expressions unwrapped. */
  getArguments(): TSESTreeUnwrapped<TSESTree.CallExpressionArgument>[] {
    return this.node.arguments.map((argument) => Extract.unwrap(argument));
  }

  /** Get the callee with type and chain expressions unwrapped. */
  getCallee(): TSESTreeUnwrapped<TSESTree.CallExpression["callee"]> {
    return Extract.unwrap(this.node.callee);
  }

  /** Get the statically determinable callee name (ex: `"useState"`), or `null`. */
  getCalleeName(): string | null {
    return Extract.getCalleeName(this.node);
  }
}

/** View over a `new` expression. */
export class NewExpressionView extends NodeViewBase<TSESTree.NewExpression> {
  /** Get the arguments with type and chain expressions unwrapped. */
  getArguments(): TSESTreeUnwrapped<TSESTree.CallExpressionArgument>[] {
    return this.node.arguments.map((argument) => Extract.unwrap(argument));
  }

  /** Get the callee with type and chain expressions unwrapped. */
  getCallee(): TSESTreeUnwrapped<TSESTree.NewExpression["callee"]> {
    return Extract.unwrap(this.node.callee);
  }
}

/** View over a member expression. */
export class MemberExpressionView extends NodeViewBase<TSESTree.MemberExpression> {
  /** Get the member chain from the base object (ex: `[a, b, c]` for `a.b.c`). */
  getMemberChain() {
    return Extract.getMemberChain(this.node);
  }

  /** Get the object with type and chain expressions unwrapped. */
  getObject(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.object);
  }

  /** Get the property with type and chain expressions unwrapped. */
  getProperty(): TSESTreeUnwrapped<TSESTree.MemberExpression["property"]> {
    return Extract.unwrap(this.node.property);
  }
}

/** View over an assignment expression. */
export class AssignmentExpressionView extends NodeViewBase<TSESTree.AssignmentExpression> {
  /** Get the assignment target with type and chain expressions unwrapped. */
  getLeft(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.left);
  }

  /** Get the assigned value with type and chain expressions unwrapped. */
  getRight(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.right);
  }
}

/** Base view over binary-like expressions sharing `left`/`right` operands. */
export class BinaryLikeView<N extends TSESTree.BinaryExpression | TSESTree.LogicalExpression> extends NodeViewBase<N> {
  /** Get the left operand with type and chain expressions unwrapped. */
  getLeft(): TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["left"]> {
    return Extract.unwrap(this.node.left);
  }

  /** Get the right operand with type and chain expressions unwrapped. */
  getRight(): TSESTreeUnwrapped<(TSESTree.BinaryExpression | TSESTree.LogicalExpression)["right"]> {
    return Extract.unwrap(this.node.right);
  }
}

/** View over a binary expression. */
export class BinaryExpressionView extends BinaryLikeView<TSESTree.BinaryExpression> {}

/** View over a logical expression. */
export class LogicalExpressionView extends BinaryLikeView<TSESTree.LogicalExpression> {}

/** View over a conditional expression. */
export class ConditionalExpressionView extends NodeViewBase<TSESTree.ConditionalExpression> {
  /** Get the alternate with type and chain expressions unwrapped. */
  getAlternate(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.alternate);
  }

  /** Get the consequent with type and chain expressions unwrapped. */
  getConsequent(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.consequent);
  }

  /** Get the test with type and chain expressions unwrapped. */
  getTest(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.test);
  }
}

/** View over an expression statement. */
export class ExpressionStatementView extends NodeViewBase<TSESTree.ExpressionStatement> {
  /** Get the expression with type and chain expressions unwrapped. */
  getExpression(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.expression);
  }
}

/** View over a return statement. */
export class ReturnStatementView extends NodeViewBase<TSESTree.ReturnStatement> {
  /** Get the argument with type and chain expressions unwrapped, or `null` for bare `return`. */
  getArgument(): TSESTreeUnwrapped<TSESTree.Expression> | null {
    return this.node.argument == null ? null : Extract.unwrap(this.node.argument);
  }
}

/** View over a throw statement. */
export class ThrowStatementView extends NodeViewBase<TSESTree.ThrowStatement> {
  /** Get the argument with type and chain expressions unwrapped. */
  getArgument(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.argument);
  }
}

/** View over a unary expression. */
export class UnaryExpressionView extends NodeViewBase<TSESTree.UnaryExpression> {
  /** Get the argument with type and chain expressions unwrapped. */
  getArgument(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.argument);
  }
}

/** View over an await expression. */
export class AwaitExpressionView extends NodeViewBase<TSESTree.AwaitExpression> {
  /** Get the argument with type and chain expressions unwrapped. */
  getArgument(): TSESTreeUnwrapped<TSESTree.Expression> {
    return Extract.unwrap(this.node.argument);
  }
}

/** View over a variable declarator. */
export class VariableDeclaratorView extends NodeViewBase<TSESTree.VariableDeclarator> {
  /** Get the initializer with type and chain expressions unwrapped, or `null` when absent. */
  getInit(): TSESTreeUnwrapped<TSESTree.Expression> | null {
    return this.node.init == null ? null : Extract.unwrap(this.node.init);
  }
}

/** View over an object literal property. */
export class PropertyView extends NodeViewBase<TSESTree.Property> {
  /** Get the key with type and chain expressions unwrapped. */
  getKey(): TSESTreeUnwrapped<TSESTree.Property["key"]> {
    return Extract.unwrap(this.node.key);
  }

  /** Get the static property name, or `null` when it cannot be statically determined. */
  getName(effort: "min" | "max" = "min"): string | null {
    return Extract.getPropertyName(this.node, effort);
  }

  /** Get the value with type and chain expressions unwrapped. */
  getValue(): TSESTreeUnwrapped<TSESTree.Property["value"]> {
    return Extract.unwrap(this.node.value);
  }
}

/** View over a JSX expression container. */
export class JSXExpressionContainerView extends NodeViewBase<TSESTree.JSXExpressionContainer> {
  /** Get the expression with type and chain expressions unwrapped. */
  getExpression(): TSESTreeUnwrapped<TSESTree.JSXExpressionContainer["expression"]> {
    return Extract.unwrap(this.node.expression);
  }
}

/**
 * Create the most specific view for a node.
 * Node types without a dedicated view get the base `NodeView`.
 * @param node The node to wrap. The tree is never modified or copied.
 * @param context Optional rule context for getters that need source text.
 * @returns A view exposing unwrapping `get*` accessors for the node.
 */
export function of(node: TSESTree.AssignmentExpression, context?: NodeViewContext): AssignmentExpressionView;
export function of(node: TSESTree.AwaitExpression, context?: NodeViewContext): AwaitExpressionView;
export function of(node: TSESTree.BinaryExpression, context?: NodeViewContext): BinaryExpressionView;
export function of(node: TSESTree.CallExpression, context?: NodeViewContext): CallExpressionView;
export function of(node: TSESTree.ConditionalExpression, context?: NodeViewContext): ConditionalExpressionView;
export function of(node: TSESTree.ExpressionStatement, context?: NodeViewContext): ExpressionStatementView;
export function of(node: TSESTree.JSXExpressionContainer, context?: NodeViewContext): JSXExpressionContainerView;
export function of(node: TSESTree.LogicalExpression, context?: NodeViewContext): LogicalExpressionView;
export function of(node: TSESTree.MemberExpression, context?: NodeViewContext): MemberExpressionView;
export function of(node: TSESTree.NewExpression, context?: NodeViewContext): NewExpressionView;
export function of(node: TSESTree.Property, context?: NodeViewContext): PropertyView;
export function of(node: TSESTree.ReturnStatement, context?: NodeViewContext): ReturnStatementView;
export function of(node: TSESTree.ThrowStatement, context?: NodeViewContext): ThrowStatementView;
export function of(node: TSESTree.UnaryExpression, context?: NodeViewContext): UnaryExpressionView;
export function of(node: TSESTree.VariableDeclarator, context?: NodeViewContext): VariableDeclaratorView;
export function of(node: TSESTree.Node, context?: NodeViewContext): NodeView;
export function of(node: TSESTree.Node, context?: NodeViewContext): NodeView {
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
      return new NodeViewBase(node, context);
  }
}
