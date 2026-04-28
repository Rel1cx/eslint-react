import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-script-url";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href={"javascript:"}></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<Foo href="javascript:"></Foo>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="javascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="javascript:void(0)"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="j\n\n\na\rv\tascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<Foo to="javascript:"></Foo>',
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        <div>
          <Foo href="javascript:"></Foo>
          <Bar link="javascript:"></Bar>
        </div>
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Different JavaScript protocol variants - case variations
    {
      code: '<a href="JavaScript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="JAVASCRIPT:"></a>',
      errors: [{ messageId: "default" }],
    },
    // With whitespace at the beginning
    {
      code: '<a href="   javascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="\t\njavascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    // With control characters
    {
      code: '<a href="\x00\x01javascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    // javascript: with various payloads
    {
      code: "<a href=\"javascript:alert('XSS')\"></a>",
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="javascript:console.log(document.cookie)"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: "<a href=\"javascript:fetch('http://evil.com')\"></a>",
      errors: [{ messageId: "default" }],
    },
    // Dynamic expression with string
    {
      code: tsx`
        const url = "javascript:void(0)";
        <a href={url}></a>
      `,
      errors: [{ messageId: "default" }],
    },
    // Multiple attributes with javascript: URLs
    {
      code: '<a href="javascript:" src="javascript:"></a>',
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Form action
    {
      code: '<form action="javascript:void(0)"></form>',
      errors: [{ messageId: "default" }],
    },
    // iframe src
    {
      code: "<iframe src=\"javascript:alert('XSS')\"></iframe>",
      errors: [{ messageId: "default" }],
    },
    // button formaction
    {
      code: '<button formaction="javascript:void(0)">Click</button>',
      errors: [{ messageId: "default" }],
    },
    // input formaction
    {
      code: '<input type="submit" formaction="javascript:void(0)" />',
      errors: [{ messageId: "default" }],
    },
    // Object data
    {
      code: '<object data="javascript:alert(1)"></object>',
      errors: [{ messageId: "default" }],
    },
    // Embed src
    {
      code: '<embed src="javascript:alert(1)"></embed>',
      errors: [{ messageId: "default" }],
    },
    // Frame src (legacy)
    {
      code: '<frame src="javascript:alert(1)"></frame>',
      errors: [{ messageId: "default" }],
    },
    // Link with javascript: URL
    {
      code: '<link href="javascript:alert(1)" />',
      errors: [{ messageId: "default" }],
    },
    // Area href
    {
      code: '<area shape="rect" coords="0,0,100,100" href="javascript:alert(1)" />',
      errors: [{ messageId: "default" }],
    },
    // Base href
    {
      code: '<base href="javascript:alert(1)" />',
      errors: [{ messageId: "default" }],
    },
    // Background attribute
    {
      code: '<body background="javascript:alert(1)"></body>',
      errors: [{ messageId: "default" }],
    },
    // Inline execution
    {
      code: "<a href=\"javascript:document.location='http://evil.com'\"></a>",
      errors: [{ messageId: "default" }],
    },
    // Unicode variations that match the regex (with tab/newline)
    {
      code: '<a href="j\na\nv\na\ns\nc\nr\ni\np\nt:"></a>',
      errors: [{ messageId: "default" }],
    },
    // Any element with href attribute containing javascript:
    {
      code: '<div href="javascript:void(0)"></div>',
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    '<a href="https://react.dev"></a>',
    '<a href="mailto:foo@bar.com"></a>',
    '<a href="#"></a>',
    '<a href=""></a>',
    '<a name="foo"></a>',
    "<a href />",
    // Other protocols
    '<a href="tel:+1234567890"></a>',
    '<a href="sms:+1234567890"></a>',
    '<a href="ftp://example.com"></a>',
    '<a href="file:///tmp/file.txt"></a>',
    // Not a string literal - dynamic values that can't be statically analyzed
    "<a href={someVariable}></a>",
    "<a href={getUrl()}></a>",
    // Object values that can't be statically resolved to string
    '<a href={{ toString: () => "/path" }}></a>',
    // Normal URLs with javascript-like substring
    '<a href="https://example.com/javascript-guide"></a>',
    '<a href="/api/javascript-parser"></a>',
    '<a href="path/to/javascript-file.js"></a>',
    // Data URI (not javascript:)
    '<a href="data:text/html,<h1>Hello</h1>"></a>',
    // About blank
    '<a href="about:blank"></a>',
    // Blob URL
    '<a href="blob:https://example.com/uuid"></a>',
    // Custom protocols
    '<a href="myapp://open"></a>',
    '<a href="steam://run/123"></a>',
    // No href attribute
    "<a>Text only</a>",
    // Empty/null/undefined
    "<a href={null}></a>",
    "<a href={undefined}></a>",
    // Number value
    "<a href={123}></a>",
    // Boolean value
    "<a href={true}></a>",
    // Template literal with expression - can't be statically resolved
    "<a href={`javascript:void(${id})`}></a>",
    // Conditional expression - can't be statically resolved
    '<a href={isActive ? "javascript:void(0)" : "/home"}></a>',
    // String with spaces between characters doesn't match the regex pattern
    '<a href="j a v a s c r i p t:"></a>',
    // Spread props - can't be statically analyzed
    tsx`
      const props = { href: "javascript:void(0)" };
      <a {...props}></a>
    `,
  ],
});
