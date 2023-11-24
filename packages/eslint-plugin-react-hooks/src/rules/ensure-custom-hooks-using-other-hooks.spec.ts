import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./ensure-custom-hooks-using-other-hooks";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    dedent`
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    dedent`
      function useData(key) {
          return useSWR(key);
      }
    `,
    dedent`
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    dedent`
      const useData = (key) => useSWR(key);
    `,
  ],
  invalid: [
    {
      code: dedent`
        const useClassnames = (obj) => {
            // Invalid, because useClassnames doesn't use any other React Hooks.
            var k, cls='';
            for (k in obj) {
              if (obj[k]) {
                cls && (cls += ' ');
                cls += k;
              }
            }
            return cls;
          }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: dedent`
        function useClassnames(obj) {
            // Invalid, because useClassnames doesn't use any other React Hooks.
            var k, cls='';
            for (k in obj) {
                if (obj[k]) {
                cls && (cls += ' ');
                cls += k;
                }
            }
            return cls;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: dedent`
        export function useNestedHook() {
            const [state, setState] = useState("state");
            function useInnerHook () {
                return "inner hook";
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: dedent`
        export function useNestedHook() {
            const useInnerHook = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
    {
      code: dedent`
        export function useNestedHook() {
            const useInnerHook = () => {
                return "inner hook";
            };

            return null
        }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useNestedHook",
          },
        },
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: dedent`
        export function useNestedHook() {
            const fn = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_CUSTOM_HOOKS_USING_OTHER_HOOKS",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
  ],
});
