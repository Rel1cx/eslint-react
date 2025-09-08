/* eslint-disable perfectionist/sort-objects */
import { TypeTable } from "fumadocs-ui/components/type-table";

import { Link } from "next-view-transitions";

const properties = {
  polymorphicPropName: {
    type: "string",
    description: <Link href="#polymorphicpropname">The prop your code uses to create polymorphic components ⤵</Link>,
    default: '"as"',
  },
  importSource: {
    type: "string",
    description: <Link href="#importsource">The source where React is imported from ⤵</Link>,
    default: '"react"',
  },
  version: {
    type: "string",
    description: <Link href="#version">React version to perform the analysis ⤵</Link>,
    default: '"detect"',
  },
};

export function AnalyzerPropertyTypeTable() {
  return <TypeTable type={properties} />;
}
