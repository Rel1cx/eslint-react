import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-string-style-props";

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
    dedent`
      <div>
        <Foo style={{}}></Foo>
        <Bar style={{}}></Bar>
      </div>
    `,
    dedent`
      <div>
        <Foo style={undefined}></Foo>
        <Bar style={undefined}></Bar>
      </div>
    `,
    dedent`
      <div>
        <Foo style={null}></Foo>
        <Bar style={null}></Bar>
      </div>
    `,
    dedent`
      <div>
        <Foo style="color: red"></Foo>
        <Bar style="color: red"></Bar>
      </div>
    `,
    dedent`
      import { createElement } from "react";

      function Foo() {
        return createElement("div", { style: {
          color: "red",
        } });
      }
    `,
    dedent`
      import { createElement } from "react";

      const style = {
        color: "red",
      };

      function Foo() {
        return createElement("div", { style });
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        <div>
          <div style="color: red"></div>
          <span style="color: red"></span>
        </div>
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }, { messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        <div>
          <div style={"color: red"}></div>
          <span style={"color: red"}></span>
        </div>
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }, { messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        <div>
          <div style={\`color: red\`}></div>
          <span style={\`color: red\`}></span>
        </div>
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }, { messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        function Foo() {
          return <div style="color: red"></div>;
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        function Foo() {
          const style = "color: red";
          return <div style={style}></div>;
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        function Foo() {
          let style = "color: red";
          return <div style={style}></div>;
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        var style = "color: red";
        function Foo() {
          return <div style={style}></div>;
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        import { createElement } from "react";

        function Foo() {
          return createElement("div", { style: "color: red" });
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
    {
      code: dedent`
        import { createElement } from "react";

        const style = "color: red";

        function Foo() {
          return createElement("div", { style });
        }
      `,
      errors: [{ messageId: "NO_STRING_STYLE_PROPS" }],
    },
  ],
});
