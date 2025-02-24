/* eslint-disable perfectionist/sort-objects */
import dedent from "dedent";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Link } from "next-view-transitions";

export function SettingsTypeTable() {
  return (
    <TypeTable
      type={{
        version: {
          type: "string",
          description: <Link href="#version">React version to perform the analysis ⤵</Link>,
          default: "detect",
        },
        importSource: {
          type: "string",
          description: <Link href="#importsource">The source where React is imported from ⤵</Link>,
          default: "react",
        },
        strictImportCheck: {
          type: "boolean",
          description: (
            <Link href="#strictimportcheck">
              Check both the shape and the import to determine if an API is from React before applying the rules. ⤵
            </Link>
          ),
          default: "false",
        },
        polymorphicPropName: {
          type: "string",
          description: (
            <Link href="#polymorphicpropname">The prop your code uses to create polymorphic components ⤵</Link>
          ),
          default: "as",
        },
        additionalComponents: {
          type: "CustomComponent[]",
          description: <Link href="#additionalcomponents">An array of components and its attributes mapping ⤵</Link>,
          default: "[]",
          typeDescription: (
            <DynamicCodeBlock
              code={dedent`
                type CustomComponent = {
                  name: string;
                  as?: string;
                  attributes?: {
                    name: string;
                    as?: string;
                    defaultValue?: string;
                  }[]
                }
              `}
              lang="ts"
            />
          ),
        },
        additionalHooks: {
          type: "Record<ReactBuiltInHookName, string[]>",
          description: <Link href="#additionalhooks">An object of aliases for React built-in Hooks ⤵</Link>,
          default: "{}",
          typeDescription: (
            <DynamicCodeBlock
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
      }}
    />
  );
}
