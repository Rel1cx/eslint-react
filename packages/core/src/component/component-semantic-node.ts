import type * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";
import type { ComponentDetectionHint } from "./component-detection-hint";
import type { ComponentFlag } from "./component-flag";

/**
 * Represents a React Function Component
 */
export interface FunctionComponentSemanticNode extends SemanticNode {
  /**
   * The identifier or identifier sequence of the component
   */
  id:
    | unit
    | AST.FunctionID;

  /**
   * The kind of component
   */
  kind: "function";

  /**
   * The AST node of the function
   */
  node: AST.TSESTreeFunction;

  /**
   * Flags describing the component's characteristics
   */
  flag: ComponentFlag;

  /**
   * Hint for how the component was detected
   */
  hint: ComponentDetectionHint;

  /**
   * List of expressions returned by the component
   */
  rets: TSESTree.ReturnStatement["argument"][];

  /**
   * The initialization path of the function
   */
  initPath:
    | unit
    | AST.FunctionInitPath;

  /**
   * Indicates if the component is inside an export default declaration
   */
  isExportDefault: boolean;

  /**
   * Indicates if the component is itself an export default declaration
   */
  isExportDefaultDeclaration: boolean;

  /**
   * List of hook calls within the component
   */
  hookCalls: TSESTree.CallExpression[];

  /**
   * The display name of the component
   */
  displayName:
    | unit
    | TSESTree.Expression;
}

/**
 * Represents a React Class Component
 */
export interface ClassComponentSemanticNode extends SemanticNode {
  /**
   * The identifier of the component
   */
  id:
    | unit
    | TSESTree.BindingName;

  /**
   * The kind of component
   */
  kind: "class";

  /**
   * The AST node of the class
   */
  node: AST.TSESTreeClass;

  /**
   * Flags describing the component's characteristics
   */
  flag: ComponentFlag;

  /**
   * Hint for how the component was detected
   */
  hint: ComponentDetectionHint;

  /**
   * List of methods and properties in the class
   */
  methods: AST.TSESTreeMethodOrProperty[];

  /**
   * The display name of the component
   */
  displayName:
    | unit
    | TSESTree.Expression;
}

/**
 * Represents a React Component
 */
export type ComponentSemanticNode = ClassComponentSemanticNode | FunctionComponentSemanticNode;
