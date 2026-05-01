import tsx from "dedent";

import { ruleTester } from "#/test";
import type { ESLintReactSettings } from "@eslint-react/shared";
import rule, { RULE_NAME } from "./no-unused-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "state never used",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state only used in useEffect callback",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log(data);
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state only used in useEffect deps",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log("effect");
          }, [data]);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state only used in useLayoutEffect callback",
      code: tsx`
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            console.log(data);
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state only used in nested function inside effect",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            const inner = () => {
              console.log(data);
            };
            inner();
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state only used in custom effect hook",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useCustomEffect(() => {
            console.log(data);
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          additionalEffectHooks: "useCustomEffect",
        },
      } as Partial<ESLintReactSettings>,
    },
    {
      name: "multiple unused states",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(1);
          return <div />;
        }
      `,
      errors: [
        { data: { name: "data1" }, messageId: "default" },
        { data: { name: "data2" }, messageId: "default" },
      ],
    },
    {
      name: "state used only in effect callback and deps",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log(data);
          }, [data]);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "state used in cleanup function",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            return () => {
              console.log(data);
            };
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "namespace import useState unused",
      code: tsx`
        import * as React from "react";

        function Component() {
          const [data, setData] = React.useState(0);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
    {
      name: "custom state hook unused",
      code: tsx`
        function Component() {
          const [data, setData] = useCustomState(0);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "useCustomState",
        },
      } as Partial<ESLintReactSettings>,
    },
    {
      name: "setter used but state value unused",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          return <button onClick={() => setData(1)} />;
        }
      `,
      errors: [
        {
          data: { name: "data" },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      name: "state used in JSX",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          return <div>{data}</div>;
        }
      `,
    },
    {
      name: "state used in event handler",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          return <div onClick={() => console.log(data)} />;
        }
      `,
    },
    {
      name: "state used in useMemo",
      code: tsx`
        import { useMemo, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const doubled = useMemo(() => data * 2, [data]);
          return <div>{doubled}</div>;
        }
      `,
    },
    {
      name: "state used in useCallback",
      code: tsx`
        import { useCallback, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const handleClick = useCallback(() => {
            console.log(data);
          }, [data]);
          return <div onClick={handleClick} />;
        }
      `,
    },
    {
      name: "state used in normal function",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const fn = () => console.log(data);
          return <div onClick={fn} />;
        }
      `,
    },
    {
      name: "state used in effect and JSX",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log(data);
          }, [data]);
          return <div>{data}</div>;
        }
      `,
    },
    {
      name: "state used in child component prop",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          return <Child value={data} />;
        }
      `,
    },
    {
      name: "state not destructured (tuple assigned to variable)",
      code: tsx`
        import { useState } from "react";

        function Component() {
          const data = useState(0);
          return <div>{data[0]}</div>;
        }
      `,
    },
    {
      name: "state in custom hook (not a component)",
      code: tsx`
        import { useState } from "react";

        function useCustomHook() {
          const [data, setData] = useState(0);
          return data;
        }
      `,
    },
  ],
});

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
