/* eslint-disable perfectionist/sort-objects */
import { CodeBlock } from "#/components/ui/CodeBlock";
import dedent from "dedent";
import { TypeTable } from "fumadocs-ui/components/type-table";

import { Link } from "next-view-transitions";

const properties = {
  additionalHooks: {
    type: "Record<ReactBuiltInHookName, string[]>",
    description: <Link href="#additionalhooks">An object of aliases for React built-in Hooks ⤵</Link>,
    default: "{}",
    typeDescription: (
      <CodeBlock
        code={dedent`
          type ReactBuiltInHookName =
            | "use"
            | "useActionState"
            | "useCallback"
            | "useContext"
            | "useDebugValue"
            | "useDeferredValue"
            | "useEffect"
            | "useFormStatus"
            | "useId"
            | "useImperativeHandle"
            | "useInsertionEffect"
            | "useLayoutEffect"
            | "useMemo"
            | "useOptimistic"
            | "useReducer"
            | "useRef"
            | "useState"
            | "useSyncExternalStore"
            | "useTransition";
        `}
        lang="ts"
      />
    ),
  },
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
