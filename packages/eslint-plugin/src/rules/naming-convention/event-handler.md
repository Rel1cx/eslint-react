# @eslint-react/naming-convention/event-handler

Enforce consistent event handler naming conventions in JSX.

## Rule Details

### ❌ Incorrect

```tsx
<Component handleChange={handleChange} />;
```

```tsx
<Component onChange={componentChanged} />;
```

### ✅ Correct

```tsx
<Component onChange={handleChange} />;
```

```tsx
<Component onChange={props.onFoo} />;
```

## Options

- `eventHandlerPrefix`: Prefix for component methods used as event handlers. Defaults to `handle`
- `eventHandlerPropPrefix`: Prefix for props that are used as event handlers. Defaults to `on`
- `checkLocalVariables`: Determines whether event handlers stored as local variables are checked. Defaults to `false`
- `checkInlineFunction`: Determines whether event handlers set as inline functions are checked. Defaults to `false`
