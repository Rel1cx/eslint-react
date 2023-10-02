import dedent from "dedent";

import * as validFunction from "../../../test/common/valid/function";
import RuleTester, { getFixturesRootDir } from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-misused-comment-in-textnode";

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
        ...validFunction.all,
        "<App foo='test'>{/* valid */}</App>",
        "<strong>&nbsp;https://www.example.com/attachment/download/1</strong>",
        "<App /* valid */ placeholder={'foo'}/>",
        "</* valid */></>",
    ],
    invalid: [
        {
            code: "<div>// invalid</div>",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "<>// invalid</>",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "<div>/* invalid */</div>",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              <div>
              // invalid
              </div>
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              <div>
              abcdef
              /* invalid */
              foo
              </div>
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              <div>
              {'abcdef'}
              // invalid
              {'foo'}
              </div>
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "<span>/*</span>",
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
