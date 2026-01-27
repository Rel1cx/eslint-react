import type { SemanticFunc } from "../semantic";

/**
 * Represents a React function
 */
export interface ClientFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function
   */
  kind: "client-function";
}

export interface ServerFunctionSemanticNode extends SemanticFunc {
  /**
   * The kind of function
   */
  kind: "server-function";
}

export type FunctionSemanticNode = ClientFunctionSemanticNode | ServerFunctionSemanticNode;
