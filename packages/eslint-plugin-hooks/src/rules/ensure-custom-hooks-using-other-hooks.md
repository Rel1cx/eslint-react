# @eslint-react/hooks/ensure-custom-hooks-using-other-hooks

> Technically, this isn’t enforced by React. In principle, you could make a Hook that doesn’t call other Hooks. This is often confusing and limiting so it’s best to avoid that pattern.

### ❌ Incorrect

```tsx
const useClassnames = (obj) => {
    // Invalid, because useClassnames doesn't use any other React Hooks.
    var k, cls = "";
    for (k in obj) {
        if (obj[k]) {
            cls && (cls += " ");
            cls += k;
        }
    }
    return cls;
};
```

### ✅ Correct

```tsx
const useData = (key) => {
    // Valid, because useData is using other React Hooks.
    return useSWR(key);
};
```

## Further reading

- [react.dev: invalid-hook-call-warning (the first note)](https://react.dev/warnings/invalid-hook-call-warning)
- [react.dev: should-all-functions-called-during-rendering-start-with-the-use-prefix (the deep dive)](https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix)
