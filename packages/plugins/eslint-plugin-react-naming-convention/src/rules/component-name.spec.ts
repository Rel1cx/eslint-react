import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./component-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Test_component() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "invalid", data: { name: "Test_component", rule: "PascalCase" } }],
    },
    {
      code: tsx`
        function TestComponent() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "invalid", data: { name: "TestComponent", rule: "CONSTANT_CASE" } }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: tsx`
        function TestComponent() {
            return <div>foo</div>
        }
      `,
      errors: [{
        messageId: "invalid",
        data: { name: "TestComponent", rule: "CONSTANT_CASE" },
      }],
      options: ["CONSTANT_CASE"],
    },
    {
      code: tsx`
        function FULLUPPERCASE() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "invalid", data: { name: "FULLUPPERCASE", rule: "PascalCase" } }],
      options: [{ allowAllCaps: false, rule: "PascalCase" }],
    },
    {
      code: tsx`
        function AppHome() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "invalid", data: { name: "AppHome", rule: "CONSTANT_CASE" } }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: tsx`
        export function _Test() {
         return (
           <div />
         )
        }
      `,
      errors: [{
        messageId: "invalid",
        data: {
          name: "_Test",
          rule: "PascalCase",
        },
      }],
    },
    {
      code: tsx`
        export function _Test() {
         return (
           <div />
         )
        }
      `,
      errors: [{
        messageId: "invalid",
        data: {
          name: "_Test",
          rule: "PascalCase",
        },
      }],
      options: [{ rule: "PascalCase" }],
    },
    {
      code: tsx`
        export function _TEST() {
         return (
           <div />
         )
        }
      `,
      errors: [{
        messageId: "invalid",
        data: {
          name: "_TEST",
          rule: "CONSTANT_CASE",
        },
      }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
  ],
  valid: [
    ...allFunctions,
    tsx`
      function AppHome() {
          return <div>foo</div>
      }
    `,
    {
      code: tsx`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    tsx`
      const AppHome = () => {
          return <div>foo</div>
      }
    `,
    {
      code: tsx`
        const APP_HOME = () => {
            return <div>foo</div>
        }
      `,
      options: [{ allowAllCaps: true, rule: "CONSTANT_CASE" }],
    },
    {
      code: tsx`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "PascalCase" }],
    },
    {
      code: tsx`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{
        excepts: [
          "AppHome",
        ],
        rule: "CONSTANT_CASE",
      }],
    },
  ],
});
