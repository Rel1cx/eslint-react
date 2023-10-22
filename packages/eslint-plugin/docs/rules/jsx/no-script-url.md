# jsx/no-script-url

Prevents usage of `javascript:` URLs as the value of the `href` prop in JSX.

## Rule Details

### ❌ Incorrect

```tsx
<a href="javascript:"></a>
<a href="javascript:void(0)"></a>
<a href="j\n\n\na\rv\tascript:"></a>
```

### ✅ Correct

```tsx
<Foo href="javascript:"></Foo>
<a href={"javascript:"}></a>
<a href="https://example.com"></a>
```

## Options

```json
{
    "react/jsx-no-script-url": [
        "error",
        [
            {
                "name": "Link",
                "props": ["to"]
            },
            {
                "name": "Foo",
                "props": ["href", "to"]
            }
        ]
    ]
}
```

Allows you to indicate a specific list of properties used by a custom component to be checked.

### name

Component name.

### props

List of properties that should be validated.

Examples of **incorrect** code for this rule, when configured with the above options:

```jsx
<Link to="javascript:void(0)"></Link>
<Foo href="javascript:void(0)"></Foo>
<Foo to="javascript:void(0)"></Foo>
```
