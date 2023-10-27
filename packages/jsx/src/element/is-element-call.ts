import { type CallFromPragmaPredicate, isCallFromPragma } from "../pragma";

/**
 * Checks if the given node is a call expression to `React.createElement`
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is a call expression to `createElement`
 */
export const isCreateElementCall: CallFromPragmaPredicate = isCallFromPragma("createElement");

/**
 * Checks if the given node is a call expression to `React.cloneElement`
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is a call expression to `cloneElement`
 */
export const isCloneElementCall: CallFromPragmaPredicate = isCallFromPragma("cloneElement");
