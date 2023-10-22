import dedent from "dedent";

import { allValid } from "../../../test/common/valid";
import RuleTester, { getFixturesRootDir } from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-script-url";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...allValid,
        '<a href="https://reactjs.org"></a>',
        '<a href="mailto:foo@bar.com"></a>',
        '<a href="#"></a>',
        '<a href=""></a>',
        '<a name="foo"></a>',
        "<a href />",
    ],
    invalid: [
        {
            code: '<a href={"javascript:"}></a>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<Foo href="javascript:"></Foo>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<a href="javascript:"></a>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<a href="javascript:void(0)"></a>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<a href="j\n\n\na\rv\tascript:"></a>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<Foo to="javascript:"></Foo>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                <div>
                  <Foo href="javascript:"></Foo>
                  <Bar link="javascript:"></Bar>
                </div>
            `,
            errors: [
                { messageId: "INVALID" },
                { messageId: "INVALID" },
            ],
        },
    ],
});
