import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./unstable-rules-of-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
  ],
  valid: [
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

    // Sibling elements — each element is checked independently
    tsx`
      <div>
        <input value="hello" />
        <input defaultValue="world" />
      </div>;
    `,
  ],
});
