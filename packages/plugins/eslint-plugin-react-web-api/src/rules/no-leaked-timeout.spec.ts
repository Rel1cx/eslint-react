import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-timeout";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Example extends React.Component {
          componentDidMount() {
            setTimeout(this.handleTimeout, 1000);
          }
        }
      `,
      errors: [
        {
          messageId: "noLeakedTimeoutNoTimeoutId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedTimeoutNoTimeoutId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedTimeoutNoTimeoutId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const timeoutId = global.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedTimeoutInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const timeoutId = globalThis.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedTimeoutInEffect",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Example extends React.Component {
        _timeoutId: number | null = null;
        componentDidMount() {
          this._timeoutId = setTimeout(() => {}, 1000);
        }
        componentWillUnmount() {
          if (this._timeoutId !== null) {
            clearTimeout(this._timeoutId);
          }
        }
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000);
          return () => clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = window.setTimeout(() => {}, 1000);
          return () => window.clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = global.setTimeout(() => {}, 1000);
          return () => global.clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = globalThis.setTimeout(() => {}, 1000);
          return () => globalThis.clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000);
          return () => globalThis.clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = globalThis.setTimeout(() => {}, 1000);
          return () => clearTimeout(timeoutId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from "react";

      function Example() {
        const timeoutIdRef = useRef<number | null>(null);
        useEffect(() => {
          timeoutIdRef.current = setTimeout(() => {}, 1000);
          return () => {
            if (timeoutIdRef.current !== null) {
              clearTimeout(timeoutIdRef.current);
            }
          };
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId: number | null = null;
          if (Math.random() > 0.5) {
            timeoutId = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId && clearTimeout(timeoutId);
          };
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId1: number | null = null;
          let timeoutId2: number | null = null;
          if (Math.random() > 0.5) {
            timeoutId1 = setTimeout(() => {}, 1000);
            timeoutId2 = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId1 && clearTimeout(timeoutId1);
            timeoutId2 && clearTimeout(timeoutId2);
          };
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId1: number | null;
          let timeoutId2: number | null;
          if (Math.random() > 0.5) {
            timeoutId1 = setTimeout(() => {}, 1000);
            timeoutId2 = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId1 && clearTimeout(timeoutId1);
            timeoutId2 && clearTimeout(timeoutId2);
          };
        }, []);
      }
    `,
  ],
});
