import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-render";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import ReactDom from "react-dom";
        import Component from "Component";

        ReactDom.render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "noRender" }],
    },
  ],
  valid: [
    /* tsx */ `
      import { createRoot } from "react-dom/client";
      import ReactDom from "react-dom";
      import Component from "Component";

      const root = createRoot(document.getElementById("app"));
      root.render(<Component />);
    `,
  ],
});
