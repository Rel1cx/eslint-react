import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-set-state-in-use-layout-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            setData(1);
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data[1]();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data.at(1)();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data.at(index)();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data[index]();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect } from "react";

        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useLayoutEffect(() => {
            data[index]();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useCustomLayoutEffect(() => {
            data[index]();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomLayoutEffect"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useCustomLayoutEffect(() => {
            data[index]();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomLayoutEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useCustomLayoutEffect(() => {
            data.at(index)();
          }, []);
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomLayoutEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            if (data === 0) {
              setData(1);
            }
          }, []);
        }
      `,
      errors: [
        {
          messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useLayoutEffect(() => {
          const handler = () => setData(1);
        }, []);
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useLayoutEffect(() => {
          fetch().then(() => setData());
        }, []);
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const Component = () => {
        const [data, setData] = useState();
        useLayoutEffect(() => {
        const onLoad = () => {
          setData();
        };
        }, []);
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const index = 0;
      function Component() {
        const data = useState(() => 0);
        useLayoutEffect(() => {
          data.at(index)();
        }, []);
      }
    `,
  ],
});
