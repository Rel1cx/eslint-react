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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
            },
          ],
        },
      ],
    },
    // Non-http(s) scheme URLs are treated as external links
    {
      code: '<a href="mailto:user@example.com" target="_blank"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="mailto:user@example.com" target="_blank" rel="noreferrer"></a>',
            },
          ],
        },
      ],
    },
    {
      code: '<a href="ftp://example.com/file" target="_blank"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="ftp://example.com/file" target="_blank" rel="noreferrer"></a>',
            },
          ],
        },
      ],
    },
    // `tel:` also matches the scheme pattern (`\w+:`), so it is reported as external
    {
      code: '<a href="tel:+1234567890" target="_blank"></a>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="tel:+1234567890" target="_blank" rel="noreferrer"></a>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target={"_blank"} rel="noreferrer"></a>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
            },
          ],
        },
      ],
    },
    // Missing rel with an unresolvable spread: the suggestion is appended after the last attribute
    {
      code: tsx`
        const props = getProps();
        <a {...props} href="https://react.dev" target="_blank"></a>;
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: tsx`
                const props = getProps();
                <a {...props} href="https://react.dev" target="_blank" rel="noreferrer"></a>;
              `,
            },
          ],
        },
      ],
    },
    // Missing rel with a trailing spread: the suggestion follows the spread so it cannot be overridden
    {
      code: tsx`
        const props = getProps();
        <a href="https://react.dev" target="_blank" {...props}></a>;
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: tsx`
                const props = getProps();
                <a href="https://react.dev" target="_blank" {...props} rel="noreferrer"></a>;
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<PolyComponent as="a" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<PolyComponent component="a" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
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
    // Member expression component with a polymorphic prop (ex: motion.div)
    {
      code: '<motion.div as="a" href="https://react.dev" target="_blank"></motion.div>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<motion.div as="a" href="https://react.dev" target="_blank" rel="noreferrer"></motion.div>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<PolyComponent as="A" href="https://react.dev" target="_blank" rel="noreferrer"></PolyComponent>',
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
              messageId: "suggest",
              data: { rel: 'rel="noreferrer"' },
              output: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
            },
          ],
        },
      ],
    },
    // allowReferrer: missing rel attribute is still reported, suggesting rel="noopener"
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [
        {
          messageId: "default",
          data: { rel: 'rel="noopener"' },
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noopener"' },
              output: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
            },
          ],
        },
      ],
      options: [{ allowReferrer: true }],
    },
    // allowReferrer: unsafe rel attribute is still reported, suggesting rel="noopener"
    {
      code: '<a href="https://react.dev" target="_blank" rel="nofollow"></a>',
      errors: [
        {
          messageId: "default",
          data: { rel: 'rel="noopener"' },
          suggestions: [
            {
              messageId: "suggest",
              data: { rel: 'rel="noopener"' },
              output: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
            },
          ],
        },
      ],
      options: [{ allowReferrer: true }],
    },
  ],
  valid: [
    '<a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>',
    '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
    '<Link href="https://react.dev" target="_blank" rel="noopener noreferrer"></Link>',
    '<Link href="https://react.dev" target="_blank" rel={"noopener noreferrer"}></Link>',
    '<Link href="https://react.dev" target="_blank" rel="noreferrer"></Link>',
    // allowReferrer: rel="noopener" alone is considered safe
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      options: [{ allowReferrer: true }],
    },
    // allowReferrer: rel="noopener" combined with other tokens
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener nofollow"></a>',
      options: [{ allowReferrer: true }],
    },
    // allowReferrer: rel="noreferrer" remains safe
    {
      code: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
      options: [{ allowReferrer: true }],
    },
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
    // Spread props are not resolved
    tsx`
      const props = { href: "https://react.dev", target: "_blank", rel: "noreferrer" };
      const a = <a {...props}></a>;
    `,
    '<a {...{ href: "https://react.dev", target: "_blank" }}></a>',
    tsx`
      const props = { href: "https://react.dev", rel: "noreferrer" };
      const a = <a target="_blank" {...props}></a>;
    `,
    {
      code: '<Box href="https://react.dev" target="_blank"></Box>',
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Boundary: the polymorphic prop on a host element is ignored
    '<div as="a" href="https://react.dev" target="_blank"></div>',
    // Boundary: non-string polymorphic prop value falls back to the element name
    '<Box as={Link} href="https://react.dev" target="_blank"></Box>',
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
