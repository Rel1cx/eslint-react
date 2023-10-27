import { JSX_EXTENSIONS } from "./constants";

export function getChildrenToArraySelector(reactPragma: string): string {
  return [
    ":matches(",
    "CallExpression",
    `[callee.object.object.name=${reactPragma}]`,
    "[callee.object.property.name=Children]",
    "[callee.property.name=toArray]",
    ",",
    "CallExpression",
    "[callee.object.name=Children]",
    "[callee.property.name=toArray]",
    ")",
  ].join("");
}

export const isJSXFile = (ext: string): ext is ".jsx" | ".tsx" => JSX_EXTENSIONS.includes(ext);
