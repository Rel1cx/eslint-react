import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-misused-comment-in-textnode";

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

const RULE_NAME = "no-misused-comment-in-textnode";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `<Foo bar='test'>{/* valid */}</Foo>`,
        `<strong>&nbsp;https://www.example.com/attachment/download/1</strong>`,
        `<Foo /* valid */ placeholder={'foo'}/>`,
        `</* valid */></>`,
    ],
    invalid: [
        {
            code: `<div>// invalid</div>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<>// invalid</>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<div>/* invalid */</div>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<div>
                // invalid
              </div>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<div>
                asdjfl
                /* invalid */
                foo
              </div>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<div>
                {'asdjfl'}
                // invalid
                {'foo'}
              </div>`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
        {
            code: `<span>/*</span>;`,
            errors: [{ messageId: "MISUSED_COMMENT_IN_TEXTNODE" }],
        },
    ],
});
