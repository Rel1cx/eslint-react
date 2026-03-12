import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./unstable-rules-of-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // ── noDuplicateProps ────────────────────────────────────────────────
    {
      code: tsx`<div id="a" id="b" />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      code: tsx`<div id="a" className="x" id="b" />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      // Triple duplicate – two reports (second and third occurrences)
      code: tsx`<div id="a" id="b" id="c" />;`,
      errors: [
        { messageId: "noDuplicateProps" },
        { messageId: "noDuplicateProps" },
      ],
    },
    {
      // Two different props each duplicated
      code: tsx`<div id="a" className="x" id="b" className="y" />;`,
      errors: [
        { messageId: "noDuplicateProps" },
        { messageId: "noDuplicateProps" },
      ],
    },
    {
      // Duplicate on a custom component
      code: tsx`<MyComponent foo="a" foo="b" />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      // Duplicate boolean props
      code: tsx`<input disabled disabled />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      // Duplicate expression props
      code: tsx`<div onClick={handleA} onClick={handleB} />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      // Duplicate namespaced props
      code: tsx`<div on:click={handleA} on:click={handleB} />;`,
      errors: [{ messageId: "noDuplicateProps" }],
    },
    {
      // Duplicate prop combined with controlled/uncontrolled violation
      code: tsx`<input value="a" value="b" defaultValue="c" />;`,
      errors: [
        { messageId: "noDuplicateProps" },
        { messageId: "noControlledAndUncontrolledTogether" },
      ],
    },

    // ── noControlledAndUncontrolledTogether ──────────────────────────────
    {
      code: tsx`<input value="hello" defaultValue="world" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<input defaultValue="world" value="hello" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<input type="checkbox" checked={true} defaultChecked />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<input type="checkbox" defaultChecked checked={false} />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<textarea value="hello" defaultValue="world" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<select value="a" defaultValue="b" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<input value={name} defaultValue="" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      code: tsx`<input checked={isChecked} defaultChecked={false} />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      // Both pairs violated on the same element
      code: tsx`<input value="hello" defaultValue="world" checked={true} defaultChecked />;`,
      errors: [
        { messageId: "noControlledAndUncontrolledTogether" },
        { messageId: "noControlledAndUncontrolledTogether" },
      ],
    },
    {
      // Custom component following the same controlled/uncontrolled pattern
      code: tsx`<MyInput value={val} defaultValue="fallback" />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      // Arbitrary foo + defaultFoo pair on a custom component
      code: tsx`<MySlider min={0} defaultMin={10} />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      // Multi-word camelCase pair: open + defaultOpen
      code: tsx`<Dropdown open={isOpen} defaultOpen={false} />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      // Multi-word camelCase pair: selectedItem + defaultSelectedItem
      code: tsx`<Select selectedItem={item} defaultSelectedItem={null} />;`,
      errors: [{ messageId: "noControlledAndUncontrolledTogether" }],
    },
    {
      // Multiple arbitrary pairs violated on the same element
      code: tsx`<MyWidget open={isOpen} defaultOpen={false} page={p} defaultPage={1} />;`,
      errors: [
        { messageId: "noControlledAndUncontrolledTogether" },
        { messageId: "noControlledAndUncontrolledTogether" },
      ],
    },
  ],
  valid: [
    // ── noDuplicateProps (valid) ────────────────────────────────────────
    // No duplicates — all unique props
    tsx`<div id="a" className="b" />;`,
    tsx`<MyComponent foo="a" bar="b" baz="c" />;`,

    // Spread attributes are ignored — can't statically determine contents
    tsx`<div id="a" {...props} />;`,

    // Same prop name on different elements is fine
    tsx`
      <div>
        <span id="a" />
        <span id="b" />
      </div>;
    `,

    // Namespaced props that are not duplicated
    tsx`<div on:click={handleA} on:focus={handleB} />;`,

    // ── noControlledAndUncontrolledTogether (valid) ──────────────────────
    // Controlled inputs
    tsx`<input value="hello" />;`,
    tsx`<input value={name} onChange={(e) => setName(e.target.value)} />;`,
    tsx`<input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />;`,
    tsx`<textarea value="hello" onChange={(e) => setValue(e.target.value)} />;`,
    tsx`<select value="a" onChange={(e) => setValue(e.target.value)} />;`,

    // Uncontrolled inputs
    tsx`<input defaultValue="world" />;`,
    tsx`<input type="checkbox" defaultChecked />;`,
    tsx`<input type="checkbox" defaultChecked={true} />;`,
    tsx`<textarea defaultValue="world" />;`,
    tsx`<select defaultValue="b" />;`,

    // Unrelated props
    tsx`<input type="text" placeholder="Enter value" />;`,
    tsx`<input type="submit" value="Submit" />;`,
    tsx`<input name="field" id="field" />;`,

    // Spread attributes are ignored (can't statically determine contents)
    tsx`<input {...props} defaultValue="world" />;`,
    tsx`<input value="hello" {...rest} />;`,

    // Props named "default" alone (no uppercase letter after prefix) are not flagged
    tsx`<MyComp default="x" />;`,

    // Only defaultFoo without foo — fine
    tsx`<Dropdown defaultOpen={false} />;`,
    tsx`<MySlider defaultMin={0} />;`,

    // Only foo without defaultFoo — fine
    tsx`<Dropdown open={isOpen} />;`,
    tsx`<MySlider min={0} />;`,

    // Sibling elements — each element is checked independently
    tsx`
      <div>
        <input value="hello" />
        <input defaultValue="world" />
      </div>;
    `,
  ],
});
