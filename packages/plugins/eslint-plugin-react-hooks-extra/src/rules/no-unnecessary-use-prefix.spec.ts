import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-use-prefix";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
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
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useClassnames",
          },
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
    {
      code: tsx`
        export function useNestedHook() {
            const useInnerHook = () => {
                return "inner hook";
            };

            return null
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useNestedHook",
          },
        },
        {
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useInnerHook",
          },
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "noUnnecessaryUsePrefix",
          data: {
            name: "useNestedHook",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      // Allow empty functions.
      const useNoop = () => {};
    `,
    tsx`
      export const userInitials = () => {
        return;
      };
    `,
    tsx`
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    tsx`
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    tsx`
      const useData = (key) => {
          return swr.useSWR(key);
      }
    `,
    tsx`
      function useData(key) {
          return useSWR(key);
      }
    `,
    tsx`
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    tsx`
      const useData = (key) => useSWR(key);
    `,
    tsx`
      function useAuth() {
        // TODO: Replace with this line when authentication is implemented:
        // return useContext(Auth);
        return TEST_USER;
      }
    `,
    tsx`
      import type { MDXComponents } from 'mdx/types'

      export function useMDXComponents(components: MDXComponents): MDXComponents {
        return {
          ...components,
        }
      }
    `,
  ],
});
