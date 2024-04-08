import dedent from "dedent";

import { allFunctions, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./react-hooks";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        function useToggle() {
            const [value, setValue] = useState(false);
            return [value, () => setValue(x => !x)];
        }
      `,
      errors: [
        {
          data: {
            name: "useToggle",
            hookCalls: 1,
          },
          messageId: "REACT_HOOKS",
        },
      ],
    },
    {
      code: dedent`
        // 🔴 Avoid: A Hook that doesn't use Hooks
        function useSorted(items) {
          return items.slice().sort();
        }
      `,
      errors: [
        {
          data: {
            name: "useSorted",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
        },
      ],
    },
    {
      code: dedent`
        function useToggle() {
            const [value, setValue] = useState(false);
            return [value, () => setValue(x => !x)];
        }

        // 🔴 Avoid: A Hook that doesn't use Hooks
        function useSorted(items) {
          return items.slice().sort();
        }
      `,
      errors: [
        {
          data: {
            name: "useToggle",
            hookCalls: 1,
          },
          messageId: "REACT_HOOKS",
        },
        {
          data: {
            name: "useSorted",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
        },
      ],
    },
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
          data: {
            name: "useClassnames",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
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
          data: {
            name: "useClassnames",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
        },
      ],
    },
    {
      code: dedent`
        export function useNestedHook() {
            const [state, setState] = useState("state");
            const useInnerHook = () => {
                return "inner hook";
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          data: {
            name: "useNestedHook",
            hookCalls: 1,
          },
          messageId: "REACT_HOOKS",
        },
        {
          data: {
            name: "useInnerHook",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
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
          data: {
            name: "useNestedHook",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
        },
        {
          data: {
            name: "useInnerHook",
            hookCalls: 1,
          },
          messageId: "REACT_HOOKS",
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
          data: {
            name: "useNestedHook",
            hookCalls: 0,
          },
          messageId: "REACT_HOOKS",
        },
      ],
    },
  ],
  valid: [
    ...allFunctions,
  ],
});
