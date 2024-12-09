import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-context-provider";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<Context.Provider />",
      errors: [{ messageId: "noContextProvider" }],
      output: "<Context />",
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: "<Context.Provider><App /></Context.Provider>",
      errors: [{ messageId: "noContextProvider" }],
      output: "<Context><App /></Context>",
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: "<Context.Provider>{children}</Context.Provider>",
      errors: [{ messageId: "noContextProvider" }],
      output: "<Context>{children}</Context>",
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: "<Foo.Bar.Provider>{children}</Foo.Bar.Provider>",
      errors: [{ messageId: "noContextProvider" }],
      output: "<Foo.Bar>{children}</Foo.Bar>",
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    {
      code: "<Context.Provider />",
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
  ],
});
