import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-context-display-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `createContext();`,
      errors: [{ messageId: "noMissingContextDisplayName" }],
    },
    {
      code: /* tsx */ `const ctx = createContext();`,
      errors: [{ messageId: "noMissingContextDisplayName" }],
    },
    {
      code: /* tsx */ `
        const ctx1 = createContext();
        const ctx2 = createContext();
        ctx1.displayName = "ctx";
      `,
      errors: [{ messageId: "noMissingContextDisplayName" }],
    },
    {
      code: /* tsx */ `
        const ctx = createContext();
        ctx.displayname = "ctx";
      `,
      errors: [{ messageId: "noMissingContextDisplayName" }],
    },
    {
      code: /* tsx */ `
        createContext();
        ctx.displayName = "ctx";
      `,
      errors: [{ messageId: "noMissingContextDisplayName" }],
    },
  ],
  valid: [
    ...allFunctions,
    /* tsx */ `const ctx = createContext(); ctx.displayName = "ctx";`,
    /* tsx */ `
      const ctx = createContext();
      const displayName = "ctx";
      ctx.displayName = displayName;
    `,
    /* tsx */ `
      const ctx1 = createContext();
      const ctx2 = createContext();
      ctx1.displayName = "ctx1";
      ctx2.displayName = "ctx2";
    `,
    /* tsx */ `
      const ctx1 = createContext();
      const ctx2 = createContext();
      const displayName = "ctx";
      ctx1.displayName = displayName;
      ctx2.displayName = displayName;
    `,
    /* tsx */ `
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
