import { allFunctions } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./hooks";

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
                    messageId: "HOOKS",
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
                    messageId: "REDUNDANT_HOOKS",
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
                    messageId: "HOOKS",
                    data: {
                        name: "useToggle",
                    },
                },
                {
                    messageId: "REDUNDANT_HOOKS",
                    data: {
                        name: "useSorted",
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
                    messageId: "REDUNDANT_HOOKS",
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
                    messageId: "REDUNDANT_HOOKS",
                },
            ],
        },
    ],
});
