import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-render";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.render(<Component />, document.getElementById("app")!);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        createRoot(document.getElementById("app")!).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        ReactDOM.render(<Component />, rootEl);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        createRoot(rootEl).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import { render } from "react-dom/client";
        import Component from "Component";

        render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import { render } from "react-dom/client";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    // Return value used in an assignment (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        const fact = render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Return value used in a return statement (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        function mount() {
          return render(<Component />, document.getElementById("app"));
        }
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Return value used as a call argument (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        consume(render(<Component />, document.getElementById("app")));
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    {
      code: tsx`
        import { render } from "react-dom";
        (render as any)(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import { render } from "react-dom";
        createRoot(document.body).render(<div />);
      `,
    },
    // Optional third callback argument (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render(<Component />, document.getElementById("app"), () => {});
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Arguments hidden in a spread (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render(<Component />, ...[document.getElementById("app"), () => {}]);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Missing second argument (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render(<Component />);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // No arguments (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
  ],
  valid: [
    tsx`
      import React from "react";
      import { render } from "react-dom/client";
      import Component from "Component";

      createRoot(document.getElementById("app")).render(<Component />);
    `,
    tsx`
      import React from "react";
      import ReactDOM from "react-dom";
      import Component from "Component";

      createRoot(document.getElementById("app")).render(<Component />);
    `,
    // render imported from another module
    tsx`
      import { render } from "some-other-lib";
      render(<Component />, document.getElementById("app"));
    `,
    // Variable named render but not called
    tsx`
      const render = 1;
      console.log(render);
    `,
  ],
});
