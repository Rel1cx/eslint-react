import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-context-provider";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<Context.Provider />`,
      errors: [
        {
          messageId: "default",
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
          messageId: "default",
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
          messageId: "default",
        },
      ],
      output: tsx`<Context>{children}</Context>`,
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
    {
      code: tsx`
        import { Tooltip } from '@base-ui-components/react/tooltip'

        function Component() {
          return <Tooltip.Provider>hello world</Tooltip.Provider>;
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
