import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-redundant-custom-hook";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        const useClassnames = (obj) => {
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
          messageId: "noRedundantCustomHook",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        function useClassnames(obj) {
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
          messageId: "noRedundantCustomHook",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noRedundantCustomHook",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noRedundantCustomHook",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        export function useNestedHook() {
            const useInnerHook = () => {
                return "inner hook";
            };

            return null
        }
      `,
      errors: [
        {
          messageId: "noRedundantCustomHook",
          data: {
            name: "useNestedHook",
          },
        },
        {
          messageId: "noRedundantCustomHook",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noRedundantCustomHook",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      // Allow empty functions.
      const useNoop = () => {};
    `,
    /* tsx */ `
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    /* tsx */ `
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    /* tsx */ `
      const useData = (key) => useSWR(key);
    `,
  ],
});
