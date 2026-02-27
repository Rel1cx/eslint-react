export type DirectiveKind = "use client" | "use server" | "use memo" | "use no memo";

/**
 * Check if a node is a directive kind
 * @param kind The kind to check
 * @returns True if the kind is a directive kind, false otherwise
 */
export function isDirectiveKind(kind: string): kind is DirectiveKind {
  return kind === "use client" || kind === "use server" || kind === "use memo" || kind === "use no memo";
}
