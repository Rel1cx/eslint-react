import { TypeTable } from "fumadocs-ui/components/type-table";

import { Link } from "next-view-transitions";

const properties = {
  version: {
    type: "string",
    description: <Link href="#version">React version to perform the analysis</Link>,
    default: '"detect"',
  },
  importSource: {
    type: "string",
    description: <Link href="#importsource">The source where React is imported from</Link>,
    default: '"react"',
  },
  polymorphicPropName: {
    type: "string",
    description: <Link href="#polymorphicpropname">The prop your code uses to create polymorphic components</Link>,
    default: '"as"',
  },
};

export function AnalyzerPropertyTypeTable() {
  return <TypeTable type={properties} />;
}
