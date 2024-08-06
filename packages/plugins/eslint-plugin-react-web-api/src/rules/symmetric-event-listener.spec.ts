import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./symmetric-event-listener";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Example extends React.Component {
          componentDidMount() {
            window.addEventListener("resize", this.handleResize);
          }
        }
      `,
      errors: [
        {
          messageId: "symmetricEventListenerInComponentDidMount",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", handleResize);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "symmetricEventListenerInUseEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize1 = () => {};
            const handleResize2 = () => {};
            window.addEventListener("resize", handleResize1);
            return () => {
              window.removeEventListener("resize", handleResize2);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "symmetricEventListenerInUseEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", () => {});
            return () => {
              window.removeEventListener("resize", () => {});
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "symmetricEventListenerNoInlineFunction",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Example extends React.Component {
        componentDidMount() {
          window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
          window.removeEventListener("resize", this.handleResize);
        }
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const handleResize = useCallback(() => {}, []);
        useEffect(() => {
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const handleResize = useMemo(() => () => {}, []);
        useEffect(() => {
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
  ],
});
