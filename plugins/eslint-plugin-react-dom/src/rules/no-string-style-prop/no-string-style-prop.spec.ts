import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-string-style-prop";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          return <div style="color: red;" />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          return <div style={"color: red;"} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          return <div style={\`color: red;\`} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Various HTML elements with string style
    {
      code: tsx`<span style="color: blue;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<p style="font-size: 14px;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<h1 style="text-align: center;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<section style="padding: 20px;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<article style="margin: 10px;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<header style="background: #fff;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<footer style="border: 1px solid;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<nav style="display: flex;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<aside style="width: 200px;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<main style="height: 100vh;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<button style="cursor: pointer;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<input style="border: none;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<img style="max-width: 100%;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<a style="text-decoration: none;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<ul style="list-style: none;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<li style="display: inline;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<table style="width: 100%;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<tr style="background: #f5f5f5;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<td style="padding: 8px;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<th style="font-weight: bold;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<form style="display: grid;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<label style="color: #333;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<textarea style="resize: none;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<select style="appearance: none;" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<option style="color: red;" />`,
      errors: [{ messageId: "default" }],
    },
    // String concatenation
    {
      code: tsx`
        function Component() {
          return <div style={"color: " + "red;"} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Variable holding string
    {
      code: tsx`
        function Component() {
          const styleStr = "color: red;";
          return <div style={styleStr} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Multiple spaces in string
    {
      code: tsx`<div style="  color:   red  ;  " />`,
      errors: [{ messageId: "default" }],
    },
    // Empty string style
    {
      code: tsx`<div style="" />`,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // Object style - correct usage
    tsx`
      function Component() {
        return <div style={{ color: "red" }} />;
      }
    `,
    // Variable style
    tsx`
      function Component() {
        return <div style={someStyle} />;
      }
    `,
    // Custom component (not host element)
    tsx`
      function Component() {
        return <StatusBar style="auto" />;
      }
    `,
    // Various HTML elements with object style
    tsx`<span style={{ color: "blue" }} />`,
    tsx`<p style={{ fontSize: 14 }} />`,
    tsx`<h1 style={{ textAlign: "center" }} />`,
    tsx`<section style={{ padding: 20 }} />`,
    tsx`<article style={{ margin: 10 }} />`,
    tsx`<header style={{ background: "#fff" }} />`,
    tsx`<footer style={{ border: "1px solid" }} />`,
    tsx`<nav style={{ display: "flex" }} />`,
    tsx`<aside style={{ width: 200 }} />`,
    tsx`<main style={{ height: "100vh" }} />`,
    tsx`<button style={{ cursor: "pointer" }} />`,
    tsx`<input style={{ border: "none" }} />`,
    tsx`<img style={{ maxWidth: "100%" }} />`,
    tsx`<a style={{ textDecoration: "none" }} />`,
    tsx`<ul style={{ listStyle: "none" }} />`,
    tsx`<li style={{ display: "inline" }} />`,
    tsx`<table style={{ width: "100%" }} />`,
    tsx`<tr style={{ background: "#f5f5f5" }} />`,
    tsx`<td style={{ padding: 8 }} />`,
    tsx`<th style={{ fontWeight: "bold" }} />`,
    tsx`<form style={{ display: "grid" }} />`,
    tsx`<label style={{ color: "#333" }} />`,
    tsx`<textarea style={{ resize: "none" }} />`,
    tsx`<select style={{ appearance: "none" }} />`,
    tsx`<option style={{ color: "red" }} />`,
    // No style attribute
    tsx`<div />`,
    tsx`<span>Text</span>`,
    // Null/undefined style
    tsx`<div style={null} />`,
    tsx`<div style={undefined} />`,
    // Number style (invalid but not string)
    tsx`<div style={123} />`,
    // Boolean style (invalid but not string)
    tsx`<div style={true} />`,
    // Array style (invalid but not string)
    tsx`<div style={[]} />`,
    // Computed object style
    tsx`
      function Component() {
        const styles = { color: "red" };
        return <div style={styles} />;
      }
    `,
    // Function returning object
    tsx`
      function Component() {
        return <div style={getStyleObject()} />;
      }
    `,
    // Inline computed
    tsx`<div style={{ ...baseStyles, color: "red" }} />`,
    // Conditional object style
    tsx`<div style={isActive ? { color: "green" } : { color: "red" }} />`,
    // CSS variable object style
    tsx`<div style={{ ["--custom-color"]: "red" }} />`,
    // Template literal with variable - can't be statically resolved to string
    tsx`
      function Component({ color }) {
        return <div style={\`color: \${color};\`} />;
      }
    `,
    // Ternary with strings - can't be statically resolved
    tsx`
      function Component({ isActive }) {
        return <div style={isActive ? "color: green;" : "color: red;"} />;
      }
    `,
    // Function call returning string - can't be statically resolved
    tsx`
      function Component() {
        return <div style={getStyleString()} />;
      }
    `,
    // Spread props with string style - can't be statically resolved
    tsx`
      const props = { style: "color: red;" };
      <div {...props} />
    `,
  ],
});
