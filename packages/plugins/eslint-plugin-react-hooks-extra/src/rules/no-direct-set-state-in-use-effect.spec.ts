import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-set-state-in-use-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[1]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(1)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(index)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from "react";

        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
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
          useCustomEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useCustomEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
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
          useCustomEffect(() => {
            data.at(index)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            if (data === 0) {
              setData(1);
            }
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
          const onLoad = () => {
            setData();
          };
          onLoad();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState();
          const [data2, setData2] = useState();
          const setAll = () => {
            setData1();
            setData2();
          }
          useEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        { data: { name: "setData1" }, messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
        { data: { name: "setData2" }, messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
              (async () => { setData() })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
            !(function onLoad() {
              setData()
            })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
            const setAll = () => {
              setData();
            }
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => {
    //         return () => {
    //           setData();
    //         }
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => {
    //         const cleanup = () => {
    //           setData();
    //         }
    //         return cleanup;
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
    //   ],
    // },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(setData, []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => setData, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
    //   ],
    // },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => setData(), []);
          return null;
        }
      `,
      errors: [
        { messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT" },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          const handler = () => setData(1);
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          fetch().then(() => setData());
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component = () => {
        const [data, setData] = useState();
        useEffect(() => {
        const onLoad = () => {
          setData();
        };
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const index = 0;
      function Component() {
        const data = useState(() => 0);
        useEffect(() => {
          data.at(index)();
        }, []);
        return null;
      }
    `,
  ],
});
