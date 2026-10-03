import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-unsafe-target-blank";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a rel="noreferrer noopener" href="https://react.dev" target="_blank"></a>',
            },
          ],
        },
      ],
    },
    {
      code: '<a href="https://react.dev" target={"_blank"}></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a rel="noreferrer noopener" href="https://react.dev" target={"_blank"}></a>',
            },
          ],
        },
      ],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
            },
          ],
        },
      ],
    },
    // Unsafe rel attribute
    {
      code: '<a href="https://react.dev" target="_blank" rel="nofollow"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
            },
          ],
        },
      ],
    },
    // Empty rel attribute (not safe)
    {
      code: '<a href="https://react.dev" target="_blank" rel=""></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const props = { href: "https://react.dev", target: "_blank" };
        const a = <a {...props}></a>;
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: tsx`
                const props = { href: "https://react.dev", target: "_blank" };
                const a = <a rel="noreferrer noopener" {...props}></a>;
              `,
            },
          ],
        },
      ],
    },
    {
      code: '<PolyComponent as="a" href="https://react.dev" target="_blank"></PolyComponent>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<PolyComponent rel="noreferrer noopener" as="a" href="https://react.dev" target="_blank"></PolyComponent>',
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: '<PolyComponent component="a" href="https://react.dev" target="_blank"></PolyComponent>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<PolyComponent rel="noreferrer noopener" component="a" href="https://react.dev" target="_blank"></PolyComponent>',
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "component",
        },
      },
    },
    // Polymorphic prop provided via spread props
    {
      code: tsx`
        const props = { as: "a" };
        <Box {...props} href="https://react.dev" target="_blank"></Box>;
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: tsx`
                const props = { as: "a" };
                <Box rel="noreferrer noopener" {...props} href="https://react.dev" target="_blank"></Box>;
              `,
            },
          ],
        },
      ],
    },
    // Member expression component with a polymorphic prop (ex: motion.div)
    {
      code: '<motion.div as="a" href="https://react.dev" target="_blank"></motion.div>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<motion.div rel="noreferrer noopener" as="a" href="https://react.dev" target="_blank"></motion.div>',
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Uppercase polymorphic prop value is normalized to lowercase
    {
      code: '<PolyComponent as="A" href="https://react.dev" target="_blank"></PolyComponent>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<PolyComponent rel="noreferrer noopener" as="A" href="https://react.dev" target="_blank"></PolyComponent>',
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Boundary: non-string rel value is not a safe rel, so the rule reports and replaces it
    {
      code: '<a href="https://react.dev" target="_blank" rel={42}></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "add-rel-noreferrer-noopener",
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
            },
          ],
        },
      ],
    },
    // TODO: Restore Link component test when support for additionalComponents is implemented. See issue #<issue-number>.
    // },
    // {
    //   code: '<Link href="https://react.dev" target="_blank" rel="noopener"></Link>',
    //   errors: [
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: '<Link href="https://react.dev" target="_blank" rel="noreferrer noopener"></Link>',
    //         },
    //       ],
    //     },
    //   ],
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //         },
    //       ],
    //     },
    //   },
    // },
    // {
    //   code: tsx`
    //     const a = <a href="https://react.dev" target="_blank"></a>;
    //     const b = <Link to="https://react.dev" target="_blank"></Link>;
    //   `,
    //   errors: [
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: tsx`
    //             const a = <a rel="noreferrer noopener" href="https://react.dev" target="_blank"></a>;
    //             const b = <Link to="https://react.dev" target="_blank"></Link>;
    //           `,
    //         },
    //       ],
    //     },
    //   ], // should be 1 error
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "to",
    //               as: "href",
    //             },
    //             {
    //               name: "rel",
    //               defaultValue: "noreferrer",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
    // {
    //   code: tsx`
    //     const a = <Link href="https://react.dev" target="_blank"></Link>;
    //     const b = <LinkButton href="https://react.dev" target="_blank" relation="noopener"></LinkButton>;
    //   `,
    //   errors: [
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: tsx`
    //             const a = <Link rel="noreferrer noopener" href="https://react.dev" target="_blank"></Link>;
    //             const b = <LinkButton href="https://react.dev" target="_blank" relation="noopener"></LinkButton>;
    //           `,
    //         },
    //       ],
    //     },
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: tsx`
    //             const a = <Link href="https://react.dev" target="_blank"></Link>;
    //             const b = <LinkButton href="https://react.dev" target="_blank" relation="noreferrer noopener"></LinkButton>;
    //           `,
    //         },
    //       ],
    //     },
    //   ],
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //           attributes: [{
    //             name: "rel",
    //             defaultValue: "noopener",
    //           }],
    //         },
    //         {
    //           name: "LinkButton",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "relation",
    //               as: "rel",
    //               defaultValue: "noreferrer",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
    // {
    //   code: tsx`
    //     const a = <Link href="https://react.dev" target="_blank"></Link>;
    //     const b = <LinkButton href="https://react.dev" target="_blank" relation="noopener"></LinkButton>;
    //   `,
    //   errors: [
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: tsx`
    //             const a = <Link href="https://react.dev" target="_blank"></Link>;
    //             const b = <LinkButton href="https://react.dev" target="_blank" relation="noreferrer noopener"></LinkButton>;
    //           `,
    //         },
    //       ],
    //     },
    //   ],
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //           attributes: [{
    //             name: "rel",
    //             defaultValue: "noreferrer",
    //           }],
    //         },
    //         {
    //           name: "LinkButton",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "relation",
    //               as: "rel",
    //               defaultValue: "noreferrer",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
    // {
    //   code: tsx`
    //     const a = <Link href="https://react.dev"></Link>;
    //   `,
    //   errors: [
    //     {
    //       messageId: "default",
    //       suggestions: [
    //         {
    //           messageId: "add-rel-noreferrer-noopener",
    //           output: tsx`
    //             const a = <Link rel="noreferrer noopener" href="https://react.dev"></Link>;
    //           `,
    //         },
    //       ],
    //     },
    //   ],
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "target",
    //               defaultValue: "_blank",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
  valid: [
    '<a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>',
    '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
    '<Link href="https://react.dev" target="_blank" rel="noopener noreferrer"></Link>',
    '<Link href="https://react.dev" target="_blank" rel={"noopener noreferrer"}></Link>',
    '<Link href="https://react.dev" target="_blank" rel="noreferrer"></Link>',
    // Internal link with target="_blank" (no external href)
    '<a href="/local" target="_blank"></a>',
    '<a href="#section" target="_blank"></a>',
    '<a href="https://react.dev" target="_self"></a>',
    '<a href="https://react.dev" target="_parent"></a>',
    '<Link href="https://react.dev" target="_self"></Link>',
    '<Link href="https://react.dev" target="_parent"></Link>',
    '<a title="https://react.dev" target="_blank"></a>',
    "<a></a>",
    "<span></span>",
    '<Box href="https://react.dev" target="_blank"></Box>',
    tsx`
      const props = { href: "https://react.dev", target: "_blank", rel: "noreferrer" };
      const a = <a {...props}></a>;
    `,
    tsx`
      const props = { href: "https://react.dev", rel: "noreferrer" };
      const a = <a target="_blank" {...props}></a>;
    `,
    tsx`
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
    // {
    //   code: '<Box href="https://react.dev" target="_blank"></Box>',
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "LinkButton",
    //           as: "a",
    //         },
    //       ],
    //       polymorphicPropName: "as",
    //     },
    //   },
    // },
    // Boundary: the polymorphic prop on a host element is ignored
    '<div as="a" href="https://react.dev" target="_blank"></div>',
    // Boundary: non-string polymorphic prop value falls back to the element name
    '<Box as={Link} href="https://react.dev" target="_blank"></Box>',
    // Boundary: later props win, spread 'as' overrides the explicit 'as'
    {
      code: tsx`
        const props = { as: "div" };
        <Box as="a" {...props} href="https://react.dev" target="_blank"></Box>;
      `,
    },
    // Member expression without a polymorphic prop is not treated as a host element
    '<motion.a href="https://react.dev" target="_blank"></motion.a>',
    {
      code: '<PolyComponent as="a" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Ported from https://github.com/oxc-project/oxc/issues/23240
    // oxlint's jsx-no-target-blank compared the target and rel conditions
    // structurally and false-positived on the compound `isEnabledA && isEnabledB`
    // condition; our rule only acts on statically resolvable `target="_blank"` with
    // an external `href`, so neither condition shape is reported
    {
      code: tsx`
        function Component({ href, isEnabledA, isEnabledB }) {
          return (
            <a
              href={href}
              target={isEnabledA && isEnabledB ? "_blank" : undefined}
              rel={isEnabledA && isEnabledB ? "noreferrer" : undefined}
            />
          );
        }
      `,
    },
    // Ported from https://github.com/oxc-project/oxc/issues/23240
    // The single-boolean counterpart from the same issue, which oxlint already handled
    {
      code: tsx`
        function Component({ href, isEnabled }) {
          return (
            <a
              href={href}
              target={isEnabled ? "_blank" : undefined}
              rel={isEnabled ? "noreferrer" : undefined}
            />
          );
        }
      `,
    },
    // Boundary: non-string href value is not an external link
    '<a href={123} target="_blank"></a>',
    // Boundary: non-string target value does not trigger the rule
    '<a href="https://react.dev" target={123}></a>',
  ],
});
