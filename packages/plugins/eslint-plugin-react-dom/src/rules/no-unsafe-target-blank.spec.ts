import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-target-blank";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
    },
    {
      code: '<a href="https://react.dev" target={"_blank"}></a>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
    },
    {
      code: /* tsx */ `
        const props = { href: "https://react.dev", target: "_blank" };
        const a = <a {...props}></a>;
      `,
      errors: [{ messageId: "noUnsafeTargetBlank" }],
    },
    {
      code: '<PolyComponent as="a" href="https://react.dev" target="_blank"></PolyComponent>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: '<PolyComponent component="a" href="https://react.dev" target="_blank"></PolyComponent>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
      settings: {
        "react-x": {
          polymorphicPropName: "component",
        },
      },
    },
    {
      code: '<Link href="https://react.dev" target="_blank"></Link>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
            },
          ],
        },
      },
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel="noopener"></Link>',
      errors: [{ messageId: "noUnsafeTargetBlank" }],
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Link",
              as: "a",
            },
          ],
        },
      },
    },
    {
      code: /* tsx */ `
        const a = <a href="https://react.dev" target="_blank"></a>;
        const b = <Link to="https://react.dev" target="_blank"></Link>;
      `,
      errors: [{ messageId: "noUnsafeTargetBlank" }], // should be 1 error
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
        { messageId: "noUnsafeTargetBlank" },
        { messageId: "noUnsafeTargetBlank" },
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
      errors: [{ messageId: "noUnsafeTargetBlank" }],
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
      errors: [{ messageId: "noUnsafeTargetBlank" }],
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
    '<Box href="https://react.dev" target="_blank"></Box>',
    /* tsx */ `
      const props = { href: "https://react.dev", target: "_blank", rel: "noreferrer" };
      const a = <a {...props}></a>;
    `,
    /* tsx */ `
      const props = { href: "https://react.dev", rel: "noreferrer" };
      const a = <a target="_blank" {...props}></a>;
    `,
    /* tsx */ `
      const props1 = { href: "https://react.dev", target: "_blank" } as const;
      const a1 = <a {...props1} target="_self"></a>;
      const props2 = { href: "https://react.dev", target: "_self" } as const;
      const a2 = <a target="_blank" {...props2}></a>;
    `,
    {
      code: '<Box href="https://react.dev" target="_blank"></Box>',
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: '<Box href="https://react.dev" target="_blank"></Box>',
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "LinkButton",
              as: "a",
            },
          ],
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: '<PolyComponent as="a" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: '<PolyComponent component="a" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
      settings: {
        "react-x": {
          polymorphicPropName: "component",
        },
      },
    },
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
                defaultValue: "noreferrer noopener",
              }],
            },
            {
              name: "LinkButton",
              as: "a",
              attributes: [
                {
                  name: "relation",
                  as: "rel",
                  defaultValue: "noreferrer noopener",
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
