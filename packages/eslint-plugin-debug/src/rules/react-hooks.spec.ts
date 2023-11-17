import { allFunctions } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./react-hooks";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
  ],
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useToggle",
            cost: 2,
          },
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useSorted",
            cost: 1,
          },
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useToggle",
            cost: 2,
          },
        },
        {
          messageId: "REACT_HOOKS",
          data: {
            name: "useSorted",
            cost: 1,
          },
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useClassnames",
            cost: 1,
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useClassnames",
            cost: 1,
          },
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useNestedHook",
            cost: 2,
          },
        },
        {
          messageId: "REACT_HOOKS",
          data: {
            name: "useInnerHook",
            cost: 1,
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useNestedHook",
            cost: 1,
          },
        },
        {
          messageId: "REACT_HOOKS",
          data: {
            name: "useInnerHook",
            cost: 2,
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
          messageId: "REACT_HOOKS",
          data: {
            name: "useNestedHook",
            cost: 1,
          },
        },
      ],
    },
  ],
});
