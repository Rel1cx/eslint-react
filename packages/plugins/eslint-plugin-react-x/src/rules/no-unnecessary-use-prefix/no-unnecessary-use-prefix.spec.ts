import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
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
          data: {
            name: "useClassnames",
          },
          messageId: "default",
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
          data: {
            name: "useClassnames",
          },
          messageId: "default",
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
          data: {
            name: "useInnerHook",
          },
          messageId: "default",
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
          data: {
            name: "useNestedHook",
          },
          messageId: "default",
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
          data: {
            name: "useNestedHook",
          },
          messageId: "default",
        },
        {
          data: {
            name: "useInnerHook",
          },
          messageId: "default",
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
          data: {
            name: "useNestedHook",
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
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
    // https://github.com/Rel1cx/eslint-react/issues/1181
    tsx`
      const mockUseSession = vi.fn().mockReturnValue(sessionUser);

      vi.mock("src/components/session/session", () => ({
        useSession: () => mockUseSession(),
      }));
    `,
  ],
});
