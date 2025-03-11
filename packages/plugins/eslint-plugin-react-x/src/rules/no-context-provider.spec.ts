import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-context-provider";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<Context.Provider />`,
      errors: [
        {
          messageId: "noContextProvider",
          data: {
            contextName: "Context",
          },
        },
      ],
      output: tsx`<Context />`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<ThemeContext.Provider><App /></ThemeContext.Provider>`,
      errors: [
        {
          messageId: "noContextProvider",
          data: {
            contextName: "ThemeContext",
          },
        },
      ],
      output: tsx`<ThemeContext><App /></ThemeContext>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<Context.Provider>{children}</Context.Provider>`,
      errors: [
        {
          messageId: "noContextProvider",
          data: {
            contextName: "Context",
          },
        },
      ],
      output: tsx`<Context>{children}</Context>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<Foo.Bar.Provider>{children}</Foo.Bar.Provider>`,
      errors: [
        {
          messageId: "noContextProvider",
          data: {
            contextName: "Foo.Bar",
          },
        },
      ],
      output: tsx`<Foo.Bar>{children}</Foo.Bar>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    {
      code: tsx`<Context.Provider />`,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
  ],
});
