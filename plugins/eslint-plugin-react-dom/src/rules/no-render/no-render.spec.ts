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
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { createRoot } from "react-dom/client";

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
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { createRoot } from "react-dom/client";

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
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { createRoot } from "react-dom/client";

        const rootEl = document.getElementById("app")!;
        createRoot(rootEl).render(<Component />);
      `,
    },
    // Merges into an existing import from the same source
    {
      code: tsx`
        import React from "react";
        import { render } from "react-dom/client";
        import Component from "Component";

        render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import React from "react";
        import { render, createRoot } from "react-dom/client";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    // No duplicate import when `createRoot` is already imported
    {
      code: tsx`
        import React from "react";
        import { render } from "react-dom/client";
        import { createRoot } from "react-dom/client";

        render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import React from "react";
        import { render } from "react-dom/client";
        import { createRoot } from "react-dom/client";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    // File-level directive stays at the very top of the file
    {
      code: tsx`
        "use client";

        ReactDOM.render(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        "use client";
        import { createRoot } from "react-dom/client";

        createRoot(document.body).render(<div />);
      `,
    },
    // Leading comments stay at the very top of the file
    {
      code: tsx`
        // Copyright (c) Example Corp.

        ReactDOM.render(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        // Copyright (c) Example Corp.
        import { createRoot } from "react-dom/client";

        createRoot(document.body).render(<div />);
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
        import { render } from "react-dom";
        import { createRoot } from "react-dom/client";
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
    // `createRoot` is already bound by another module (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        import { createRoot } from "some-other-lib";
        render(<Component />, document.getElementById("app"));
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
