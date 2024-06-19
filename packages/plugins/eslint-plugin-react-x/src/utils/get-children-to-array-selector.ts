export function getChildrenToArraySelector(): string {
  return [
    ":matches(",
    "CallExpression",
    "[callee.object.property.name=Children]",
    "[callee.property.name=toArray]",
    ",",
    "CallExpression",
    "[callee.object.name=Children]",
    "[callee.property.name=toArray]",
    ")",
  ].join("");
}
