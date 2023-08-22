import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./button-has-type";

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

const RULE_NAME = "button-has-type";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        "<span/>",
        '<span type="foo"/>',
        '<button type="button"/>',
        '<button type="submit"/>',
        '<button type="reset"/>',
        '<button type={"button"}/>',
        "<button type={'button'}/>",
        "<button type={`button`}/>",
        '<button type={condition ? "button" : "submit"}/>',
        "<button type={condition ? 'button' : 'submit'}/>",
        "<button type={condition ? `button` : `submit`}/>",
        'React.createElement("span")',
        'React.createElement("span", {type: "foo"})',
        'React.createElement("button", {type: "button"})',
        "React.createElement(\"button\", {type: 'button'})",
        'React.createElement("button", {type: `button`})',
        'React.createElement("button", {type: "submit"})',
        "React.createElement(\"button\", {type: 'submit'})",
        'React.createElement("button", {type: `submit`})',
        'React.createElement("button", {type: "reset"})',
        "React.createElement(\"button\", {type: 'reset'})",
        'React.createElement("button", {type: `reset`})',
        'React.createElement("button", {type: condition ? "button" : "submit"})',
        "React.createElement(\"button\", {type: condition ? 'button' : 'submit'})",
        'React.createElement("button", {type: condition ? `button` : `submit`})',
        'document.createElement("button")',
        {
            code: '<button type="button"/>',
            options: [{ reset: false }],
        },
        {
            code: 'React.createElement("button", {type: "button"})',
            options: [{ reset: false }],
        },
        {
            code: 'Foo.createElement("span")',
            settings: {
                react: {
                    pragma: "Foo",
                },
            },
        },
    ],
    // TODO: Add invalid cases
    invalid: [],
});
