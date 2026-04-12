import type { SemanticFunc } from "./semantic";

/**
 * Represents the kind of a React function
 */
export type FunctionKind =
  | "client-function"
  | "server-function";

/**
 * Represents a React Client Function
 */
export interface ClientFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function
   */
  kind: "client-function";
}

/**
 * Represents a React Server Function
 */
export interface ServerFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function
   */
  kind: "server-function";
}

/**
 * Represents a React Function
 */
export type FunctionSemanticNode = ClientFunctionSemanticNode | ServerFunctionSemanticNode;
