/* eslint-disable perfectionist/sort-objects */
import { TypeTable } from "fumadocs-ui/components/type-table";

import { Link } from "next-view-transitions";

const properties = {
  version: {
    type: "string",
    description: <Link href="#version">React version for semantic analysis</Link>,
    default: '"detect"',
  },
  importSource: {
    type: "string",
    description: <Link href="#importsource">The source where React is imported from</Link>,
    default: '"react"',
  },
  compilationMode: {
    type: "string",
    description: (
      <Link href="#compilationmode">The [React Compiler](https://react.dev/learn/react-compiler) compilation mode</Link>
    ),
  },
  polymorphicPropName: {
    type: "string",
    description: <Link href="#polymorphicpropname">The prop your code uses to create polymorphic components</Link>,
    default: '"as"',
  },
  additionalStateHooks: {
    type: "string",
    description: (
      <Link href="#additionalstatehooks">
        Regex pattern matching custom hooks that should be treated as state hooks
      </Link>
    ),
  },
};

export function AnalyzerPropertyTypeTable() {
  return <TypeTable type={properties} />;
}
