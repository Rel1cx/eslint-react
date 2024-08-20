import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-interval";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Example extends React.Component {
          componentDidMount() {
            setInterval(this.handleInterval, 1000);
          }
        }
      `,
      errors: [
        {
          messageId: "noLeakedIntervalNoIntervalId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedIntervalNoIntervalId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedIntervalNoIntervalId",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const intervalId = global.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedIntervalInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const intervalId = globalThis.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedIntervalInEffect",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Example extends React.Component {
        _intervalId: number | null = null;
        componentDidMount() {
          this._intervalId = setInterval(() => {}, 1000);
        }
        componentWillUnmount() {
          if (this._intervalId !== null) {
            clearInterval(this._intervalId);
          }
        }
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000);
          return () => clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = window.setInterval(() => {}, 1000);
          return () => window.clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = global.setInterval(() => {}, 1000);
          return () => global.clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = globalThis.setInterval(() => {}, 1000);
          return () => globalThis.clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000);
          return () => globalThis.clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = globalThis.setInterval(() => {}, 1000);
          return () => clearInterval(intervalId);
        }, []);
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from "react";

      function Example() {
        const intervalIdRef = useRef<number | null>(null);
        useEffect(() => {
          intervalIdRef.current = setInterval(() => {}, 1000);
          return () => {
            if (intervalIdRef.current !== null) {
              clearInterval(intervalIdRef.current);
            }
          };
        }, []);
      }
    `,
  ],
});
