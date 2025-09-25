import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
  ],
  valid: [
    ...allValid,
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
    // Valid: key on top-level elements in an array literal
    tsx`
      const elements = [<div key='1' />, <div key='2' />]
    `,
    // Valid: child elements without a key prop
    tsx`
      things.map(thing => <div key={thing.id}><p>Hello</p></div>)
    `,
    // Valid: key prop in a non-map/array context (this rule does not handle this case)
    tsx`
      <div key='static-key' />
    `,
    // Valid: key prop on a child in a non-map/array context
    tsx`
      <div><p key='static-child-key' /></div>
    `,
    // Valid: not a list rendering context
    tsx`
      things.map(thing => {
        function NestedComponent() {
          return <span key='foo'><span key='bar' /></span>;
        }
      })
    `,
  ],
});
