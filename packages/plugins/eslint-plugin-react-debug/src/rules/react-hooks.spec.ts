import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./react-hooks";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function useToggle() {
            const [value, setValue] = useState(false);
            return [value, () => setValue(x => !x)];
        }
      `,
      errors: [
        {
          messageId: "reactHooks",
          data: {
            name: "useToggle",
            hookCalls: 1,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        // 🔴 Avoid: A Hook that doesn't use Hooks
        function useSorted(items) {
          return items.slice().sort();
        }
      `,
      errors: [
        {
          messageId: "reactHooks",
          data: {
            name: "useSorted",
            hookCalls: 0,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "reactHooks",
          data: {
            name: "useToggle",
            hookCalls: 1,
          },
        },
        {
          messageId: "reactHooks",
          data: {
            name: "useSorted",
            hookCalls: 0,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "reactHooks",
          data: {
            name: "useClassnames",
            hookCalls: 0,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "reactHooks",
          data: {
            name: "useClassnames",
            hookCalls: 0,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "reactHooks",
          data: {
            name: "useNestedHook",
            hookCalls: 1,
          },
        },
        {
          messageId: "reactHooks",
          data: {
            name: "useInnerHook",
            hookCalls: 0,
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
          messageId: "reactHooks",
          data: {
            name: "useNestedHook",
            hookCalls: 0,
          },
        },
        {
          messageId: "reactHooks",
          data: {
            name: "useInnerHook",
            hookCalls: 1,
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
          messageId: "reactHooks",
          data: {
            name: "useNestedHook",
            hookCalls: 0,
          },
        },
      ],
    },
  ],
  valid: [
    ...allFunctions,
  ],
});
