import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-context-display-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`createContext();`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`const ctx = createContext();`,
      errors: [{ messageId: "default" }],
      output: tsx`
        const ctx = createContext();
        ctx.displayName = "ctx";
      `,
    },
    {
      code: tsx`
        const ctx1 = createContext();
        const ctx2 = createContext();
        ctx1.displayName = "ctx";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        const ctx1 = createContext();
        const ctx2 = createContext();
        ctx2.displayName = "ctx2";
        ctx1.displayName = "ctx";
      `,
    },
    {
      code: tsx`
        const ctx = createContext();
        ctx.displayname = "ctx";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        const ctx = createContext();
        ctx.displayName = "ctx";
        ctx.displayname = "ctx";
      `,
    },
    {
      code: tsx`
        createContext();
        ctx.displayName = "ctx";
      `,
      errors: [{ messageId: "default" }],
    },
    {
      // this doesn't make sense, it's just to test the autofixer
      code: tsx`
        const [nonsense] = createContext();
        const { invalid } = createContext();
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      // not autofixable
      code: tsx`
        const contexts = { a: createContext(), b: createContext() };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      // not autofixable
      code: tsx`
        const [a, b] = [createContext(), createContext()];
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allFunctions,
    tsx`const ctx = createContext(); ctx.displayName = "ctx";`,
    tsx`
      const ctx = createContext();
      const displayName = "ctx";
      ctx.displayName = displayName;
    `,
    tsx`
      const ctx1 = createContext();
      const ctx2 = createContext();
      ctx1.displayName = "ctx1";
      ctx2.displayName = "ctx2";
    `,
    tsx`
      const ctx1 = createContext();
      const ctx2 = createContext();
      const displayName = "ctx";
      ctx1.displayName = displayName;
      ctx2.displayName = displayName;
    `,
    tsx`
      const ctx1 = createContext();
      const ctx2 = createContext();
      {
        const displayName = "ctx";
        ctx1.displayName = displayName;
        ctx2.displayName = displayName;
      }
    `,
  ],
});
