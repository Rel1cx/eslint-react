import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-target-blank";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target={"_blank"}></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel="noopener"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: /* tsx */ `
        const a = <a href="https://react.dev" target="_blank"></a>;
        const b = <Link to="https://react.dev" target="_blank"></Link>;
      `,
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }], // should be 1 error
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [
                {
                  name: "to",
                  as: "href",
                },
                {
                  name: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <Link href="https://react.dev" target="_blank"></Link>;
        const b = <LinkButton href="https://react.dev" target="_blank" relation="noopener"></LinkButton>;
      `,
      errors: [
        { messageId: "NO_UNSAFE_TARGET_BLANK" },
        { messageId: "NO_UNSAFE_TARGET_BLANK" },
      ],
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [{
                name: "rel",
                defaultValue: "noopener",
              }],
            },
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "relation",
                  as: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <Link href="https://react.dev" target="_blank"></Link>;
        const b = <LinkButton href="https://react.dev" target="_blank" relation="noopener"></LinkButton>;
      `,
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [{
                name: "rel",
                defaultValue: "noreferrer",
              }],
            },
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "relation",
                  as: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <Link href="https://react.dev"></Link>;
      `,
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [
                {
                  name: "target",
                  defaultValue: "_blank",
                },
              ],
            },
          ],
        },
      },
    },
  ],
  valid: [
    ...allValid,
    "<span></span>",
    "<a></a>",
    '<a href="https://react.dev" target="_self"></a>',
    '<a href="https://react.dev" target="_parent"></a>',
    '<a title="https://react.dev" target="_blank"></a>',
    '<Link href="https://react.dev" target="_self"></Link>',
    '<Link href="https://react.dev" target="_parent"></Link>',
    '<a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>',
    '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
    '<Link href="https://react.dev" target="_blank" rel="noopener noreferrer"></Link>',
    '<Link href="https://react.dev" target="_blank" rel={"noopener noreferrer"}></Link>',
    '<Link href="https://react.dev" target="_blank" rel="noreferrer"></Link>',
    {
      code: '<LinkButton href="https://react.dev" target="_blank"></LinkButton>',
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "LinkButton",
              as: "a",
              attributes: [{
                name: "rel",
                defaultValue: "noreferrer",
              }],
            },
          ],
        },
      },
    },
    {
      code: '<LinkButton to="https://react.dev" target="_blank"></LinkButton>',
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "LinkButton",
              as: "a",
              attributes: [{
                name: "rel",
                defaultValue: "noreferrer",
              }],
            },
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "to",
                  as: "href",
                  defaultValue: "",
                },
                {
                  name: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: '<LinkButton to="https://react.dev" target="_blank"></LinkButton>',
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "to",
                  as: "href",
                  defaultValue: "noreferrer",
                },
                {
                  name: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <Link href="https://react.dev" target="_blank"></Link>;
        const b = <LinkButton href="https://react.dev" target="_blank"></LinkButton>;
      `,
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [{
                name: "rel",
                defaultValue: "noreferrer",
              }],
            },
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "relation",
                  as: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <Link href="https://react.dev"></Link>;
      `,
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
              attributes: [
                {
                  name: "target",
                  defaultValue: "_blank",
                },
                {
                  name: "rel",
                  defaultValue: "noreferrer",
                },
              ],
            },
          ],
        },
      },
    },
    // TODO: Implement this
    // {
    //   code: /* tsx */ `
    //     const a = <Button component="a" href="https://react.dev"></Button>;
    //   `,
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Button",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "target",
    //               defaultValue: "_blank",
    //             },
    //           ],
    //           selector: "JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])",
    //         },
    //       ],
    //     },
    //   },
    // },
    // TODO: Implement this
    // {
    //   code: /* tsx */ `
    //     const a = <Button component="a" href="https://react.dev"></Button>;
    //   `,
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "*",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "target",
    //               defaultValue: "_blank",
    //             },
    //           ],
    //           selector: "JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])",
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
});
