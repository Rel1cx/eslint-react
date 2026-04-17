export function isContextName(name: string, isReact18OrBelow: boolean): boolean {
  if (name === "Provider") return true;
  if (!isReact18OrBelow) {
    return name.endsWith("Context") || name.endsWith("CONTEXT");
  }
  return false;
}
