import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        <div key="static-key"></div>
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
    {
      code: tsx`
        <>
          <span key="child-1"></span>
          <span key="child-2"></span>
        </>
      `,
      errors: [{ messageId: "noUnnecessaryKey" }, { messageId: "noUnnecessaryKey" }],
    },
    {
      code: tsx`
        things.map(thing => {
          function NestedComponent() {
            return <span key='foo'><span key='bar' /></span>;
          }
        })
      `,
      errors: [{ messageId: "noUnnecessaryKey" }, { messageId: "noUnnecessaryKey" }],
    },
    // Invalid: unnecessary key on a child element in a map
    {
      code: tsx`
        things.map(thing => <div key={thing.id}><p key='child-1' /></div>)
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
    // Invalid: redundant key on a direct child when the parent Fragment already has the key
    {
      code: tsx`
        things.map(thing => <React.Fragment key={thing.id}><div key={thing.id}>{thing.name}</div></React.Fragment>)
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
    // Invalid: multiple unnecessary keys on child elements
    {
      code: tsx`
        things.map(thing => <div key={thing.id}><p key='child-1' /><span key='child-2' /></div>)
      `,
      errors: [{ messageId: "noUnnecessaryKey" }, { messageId: "noUnnecessaryKey" }],
    },
    // TODO: Add support for array literal
    // Invalid: unnecessary key on a child element in an array literal
    // {
    //   code: tsx`
    //     const elements = [<div key='1'><p key='child' /></div>]
    //   `,
    //   errors: [{ messageId: "noUnnecessaryKey" }],
    // },
    // Invalid: unnecessary key within an element returned from a function expression
    {
      code: tsx`
        things.map(function(thing) { return <div key={thing.id}><i key='icon' /></div>; })
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
    // Invalid: unnecessary key in a nested map call
    {
      code: tsx`
        outers.map(outer => <div key={outer.id}>{inners.map(inner => <p key={inner.id}><span key='extra' /></p>)}</div>)
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
    // Invalid: unnecessary key with a static value
    {
      code: tsx`
        <span key="static-key"></span>
      `,
      errors: [{ messageId: "noUnnecessaryKey" }],
    },
  ],
  valid: [
    tsx`
      <React.Fragment key="static-key" />
    `,
    tsx`
      <React.Fragment key="static-key"></React.Fragment>
    `,
    // Valid: key on the top-level element in a map
    tsx`
      things.map(thing => <div key={thing.id} />)
    `,
    // Valid: key on the top-level React.Fragment in a map
    tsx`
      things.map(thing => <React.Fragment key={thing.id}><div /></React.Fragment>)
    `,
    // Valid: key on the top-level element returned from a function expression in a map
    tsx`
      things.map(function(thing) { return <p key={thing.id} />; })
    `,
    tsx`
      const element = <div key='1' />;
    `,
    tsx`
      const elements = [<div key='1' />, <div key='2' />]
    `,
    // Valid: child elements without a key prop
    tsx`
      things.map(thing => <div key={thing.id}><p>Hello</p></div>)
    `,
    tsx`
      things.map(thing => <div key={thing.id}><p {...props} key='child-1' /></div>);
    `,
    tsx`
      things.map(thing => <div key={thing.id}><p key='child-1' {...props} /></div>);
    `,
    tsx`
      function IResetChildrenOnWritingDirectionChange1({ lang = "en", children }: { lang?: "en" | "fr" | "ar"; children: React.ReactNode }) {
        return (
          <div>
            {lang === "en" && <div key="ltr">{children}</div>}
            {lang === "fr" && <div key="ltr">{children}</div>}
            {lang === "ar" && <div key="rtl">{children}</div>}
          </div>
        );
      }
    `,
    tsx`
      function IResetChildrenOnWritingDirectionChange2({ lang = "en", children }: { lang?: "en" | "fr" | "ar"; children: React.ReactNode }) {
        if (lang === "ar") return <div key="rtl">{children}</div>;
        return <div>{children}</div>;
      }
    `,
  ],
});
