import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-context-provider";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<context.Provider />`,
      errors: [
        {
          messageId: "noContextProvider",
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<Context.Provider />`,
      errors: [
        {
          messageId: "noContextProvider",
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
        },
      ],
      output: tsx`<Foo.Bar>{children}</Foo.Bar>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<foo.Bar.Provider>{children}</foo.Bar.Provider>`,
      errors: [
        {
          messageId: "noContextProvider",
        },
      ],
      output: tsx`<foo.Bar>{children}</foo.Bar>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<foo.bar.Provider>{children}</foo.bar.Provider>`,
      errors: [
        {
          messageId: "noContextProvider",
        },
      ],
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
    {
      code: tsx`<Context />`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<ThemeContext.Provider><App /></ThemeContext.Provider>`,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`<ThemeContext.Provider>{children}</ThemeContext.Provider>`,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`<ThemeContext><App /></ThemeContext>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`<ThemeContext>{children}</ThemeContext>`,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`
        import { Provider } from "jotai";

        function Component() {
          return <Provider>hello world</Provider>;
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
});
