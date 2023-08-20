import rule, { RULE_NAME } from "../rules/jsx-boolean-value";
import { ruleTester } from "./helpers";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: "<App foo />;",
            options: ["never"],
        },
        {
            code: "<App foo bar={true} />;",
            options: ["always", { never: ["foo"] }],
        },
        {
            code: "<App foo={true} />;",
            options: ["always"],
        },
        {
            code: "<App foo={true} bar />;",
            options: ["never", { always: ["foo"] }],
        },
    ],
    invalid: [
        {
            code: "<App foo={true} />;",
            // output: "<App foo />;",
            options: ["never"],
            errors: [{ messageId: "omitBoolean" }],
        },
        {
            code: "<App foo={true} bar={true} baz={true} />;",
            // output: "<App foo bar baz={true} />;",
            options: ["always", { never: ["foo", "bar"] }],
            errors: [
                {
                    messageId: "omitBoolean",
                },
                {
                    messageId: "omitBoolean",
                },
            ],
        },
        {
            code: "<App foo={true} />;",
            // output: "<App foo />;",
            errors: [{ messageId: "omitBoolean" }],
        },
        {
            code: "<App foo = {true} />;",
            // output: "<App foo />;",
            errors: [{ messageId: "omitBoolean" }],
        },
        {
            code: "<App foo />;",
            // output: "<App foo={true} />;",
            options: ["always"],
            errors: [{ messageId: "setBoolean" }],
        },
        {
            code: "<App foo bar baz />;",
            // output: "<App foo={true} bar={true} baz />;",
            options: ["never", { always: ["foo", "bar"] }],
            errors: [
                {
                    messageId: "setBoolean",
                },
                {
                    messageId: "setBoolean",
                },
            ],
        },
    ],
});
