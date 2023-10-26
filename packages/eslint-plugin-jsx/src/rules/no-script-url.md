# jsx/no-script-url

<!-- end auto-generated rule header -->

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
