import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-use-context";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useContext } from 'react'

        export const Component = () => {
          const value = useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import { use } from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { useContext } from 'react'

        export const Component = () => {
          const value = useContext<MyContext>(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import { use } from 'react'

        export const Component = () => {
          const value = use<MyContext>(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { use, useContext } from 'react'

        export const Component = () => {
          const value = useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import { use } from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { use, useContext, useState } from 'react'

        export const Component = () => {
          const value = useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import { use, useState } from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import {use,useContext,useState} from 'react'

        export const Component = () => {
          const value = useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import {use,useState} from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from 'react'

        export const Component = () => {
          const value = React.useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import React from 'react'

        export const Component = () => {
          const value = React.use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { use, useContext as useCtx } from 'react'

        export const Component = () => {
          const value = useCtx(MyContext)
          return <div>{value}</div>
        }
      `,
      errors: [
        { messageId: "noUseContext" },
        { messageId: "noUseContext" },
      ],
      output: /* tsx */ `
        import { use, useContext as useCtx } from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    {
      code: /* tsx */ `
        import { useContext } from 'react'

        export const Component = () => {
          const value = useContext(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "18.3.1",
        },
      },
    },
    {
      code: /* tsx */ `
        import { use } from 'react'

        export const Component = () => {
          const value = use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from 'react'

        export const Component = () => {
          const value = React.use(MyContext)
          return <div>{value}</div>
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
});
