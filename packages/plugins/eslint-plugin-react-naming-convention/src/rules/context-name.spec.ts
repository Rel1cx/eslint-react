import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./context-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `
      import { createContext } from "react";
      const Foo = createContext({});
    `,
      errors: [{ messageId: "contextName" }],
    },
    {
      code: `
      import { createContext } from "react";
      const Ctx = createContext({});
    `,
      errors: [{ messageId: "contextName" }],
    },
  ],
  valid: [
    ...allFunctions,
    /* tsx */ `
      import { createContext } from "react";
      const MyContext = createContext({});
    `,
  ],
});
