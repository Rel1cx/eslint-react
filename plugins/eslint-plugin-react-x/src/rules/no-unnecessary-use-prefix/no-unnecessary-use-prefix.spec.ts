import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
    // A hook defined OUTSIDE the mock call and merely referenced inside it is still reported
    {
      code: tsx`
        function useThing() {
          return 1;
        }

        vi.mock("src/module", () => ({ useThing }));
      `,
      errors: [
        {
          data: {
            name: "useThing",
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    tsx`
      const useData = (key) => useSWR(key);
    `,
    tsx`
      const useData = (key) => {
          return useSWR(key);
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
      const useData = (key) => {
          return swr.useSWR(key);
      }
    `,
    tsx`
      // Allow empty functions.
      const useNoop = () => {};
    `,
    tsx`
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    tsx`
      export const userInitials = () => {
        return;
      };
    `,
    tsx`
      function useMotionStyle() {
        const shadowX = useSpring(0);
        const shadowY = useMotionValue(0);
        const shadow = useMotionTemplate\`drop-shadow(\${shadowX}px \${shadowY}px 20px rgba(0,0,0,0.3))\`;
        return shadow;
      }
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
    // Hook calls nested in non-hook callbacks are attributed to the enclosing hook
    tsx`
      export function useNestedHook() {
          const fn = () => {
              const [state, setState] = useState("state");
              return state;
          };

          return [state, setState, useInnerHook] as const;
      }
    `,
    tsx`
      function useMultiResizable(items) {
        return items.map((item) => useSingleResizable(item));
      }
    `,
    // The React `use` API itself and its polyfills
    tsx`
      export const use = typeof React.use === "function"
        ? React.use
        : (usable) => usable._runtime();
    `,
    // bun:test style module mocks
    tsx`
      mock.module("react-i18next", {
        namedExports: {
          useTranslation: () => _stableI18n,
          Trans: ({ i18nKey }) => i18nKey,
        },
      });
    `,
    // Object-form second argument of a test mock registration
    tsx`
      jest.mock("react-i18next", {
        namedExports: {
          useTranslation: () => stableI18n,
        },
      });
    `,
    // The React `use` API as a plain function declaration
    tsx`
      export function use(usable) {
        return usable._runtime();
      }
    `,
  ],
});
