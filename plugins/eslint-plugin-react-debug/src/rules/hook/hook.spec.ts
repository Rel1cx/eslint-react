import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./hook";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function useToggle() {
            const [value, setValue] = useState(false);
            return [value, () => setValue(x => !x)];
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useToggle",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function useMultipleHooks() {
          const [state] = useState(0);
          useEffect(() => {});
          useCallback(() => {}, []);
          return state;
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useMultipleHooks",
              hookCalls: 3,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        // A Hook that doesn't call any other Hooks — still collected and reported
        function useSorted(items) {
          return items.slice().sort();
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useSorted",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function useClassnames(obj) {
            // useClassnames doesn't call any other React Hooks, so hookCalls is 0.
            var k, cls='';
            for (k in obj) {
              if (obj[k]) {
                cls && (cls += ' ');
                cls += k;
              }
            }
            return cls;
          }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useClassnames",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const useClassnames = (obj) => {
            // useClassnames doesn't call any other React Hooks, so hookCalls is 0.
            var k, cls='';
            for (k in obj) {
              if (obj[k]) {
                cls && (cls += ' ');
                cls += k;
              }
            }
            return cls;
          }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useClassnames",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const useExpressionBody = () => useState(0);
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useExpressionBody",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const useExpressionHook = function() {
          return useState(0);
        };
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useExpressionHook",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function useToggle() {
            const [value, setValue] = useState(false);
            return [value, () => setValue(x => !x)];
        }

        // A Hook that doesn't call any other Hooks — still collected and reported
        function useSorted(items) {
          return items.slice().sort();
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useToggle",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
        {
          data: {
            json: JSON.stringify({
              name: "useSorted",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        export function useNestedHook() {
            const [state, setState] = useState("state");
            const useInnerHook = () => {
                return "inner hook";
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useNestedHook",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
        {
          data: {
            json: JSON.stringify({
              name: "useInnerHook",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        export function useNestedHook() {
            const useInnerHook = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useNestedHook",
              hookCalls: 0,
            }),
          },
          messageId: "default",
        },
        {
          data: {
            json: JSON.stringify({
              name: "useInnerHook",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        export function useNestedHook() {
            const fn = () => {
                const [state, setState] = useState("state");
                return state;
            };

            return [state, setState, useInnerHook] as const;
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useNestedHook",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function useData(promise) {
          return use(promise);
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useData",
              hookCalls: 1,
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function useMotionStyle() {
          const shadowX = useSpring(0);
          const shadowY = useMotionValue(0);
          const shadow = useMotionTemplate\`drop-shadow(\${shadowX}px \${shadowY}px 20px rgba(0,0,0,0.3))\`;
          return shadow;
        }
      `,
      errors: [
        {
          data: {
            json: JSON.stringify({
              name: "useMotionStyle",
              hookCalls: 3,
            }),
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [],
});
