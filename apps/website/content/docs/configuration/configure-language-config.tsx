import { CodeBlock } from "#/components/ui/CodeBlock";
import dedent from "dedent";
import { TypeTable } from "fumadocs-ui/components/type-table";

import { Link } from "next-view-transitions";

export function JSXConfigTypeTable() {
  return (
    <TypeTable
      type={{
        jsx: {
          type: "JSXTransform",
          description: <Link href="https://www.typescriptlang.org/tsconfig/#jsx">The JSX transform to use</Link>,
          default: '"react-jsx"',
          typeDescription: (
            <CodeBlock
              code={dedent`
                type JSXTransform =
                  | "none"
                  | "react-jsx"
                  | "react-jsxdev"
                  | "preserve"
                  | "react-native"
                  | "react";
              `}
              lang="ts"
            />
          ),
        },
        jsxFactory: {
          type: "string",
          description: (
            <Link href="https://www.typescriptlang.org/tsconfig/#jsxFactory">
              The factory function to use when creating JSX elements
            </Link>
          ),
          default: '"React.createElement"',
        },
        jsxFragmentFactory: {
          type: "string",
          description: (
            <Link href="https://www.typescriptlang.org/tsconfig/#jsxFragmentFactory">
              The factory function to use when creating JSX fragments
            </Link>
          ),
          default: '"React.Fragment"',
        },
        jsxImportSource: {
          type: "string",
          description: (
            <Link href="https://www.typescriptlang.org/tsconfig/#jsxImportSource">
              The source module to import JSX elements from
            </Link>
          ),
          default: '"react"',
        },
      }}
    />
  );
}
