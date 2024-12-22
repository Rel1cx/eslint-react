# filename-extension

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/filename-extension
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/filename-extension
```

**Features**

`🔍` `⚙️`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename-extension.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/filename-extension.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/naming-convention-filename-extension.md)

## What it does

Enforces consistent use of the JSX file extension.

## Examples

This rule enforces consistent file extensions for JSX files.

## Rule Options

- `allow`: When to allow a JSX filename extension. Default is `"as-needed"`. Possible values:
  1. `"always"`: allow all file use JSX file extension.
  2. `"as-needed"`: allow JSX file extension only if the file contains JSX syntax.
- `extensions`: List of file extensions that should be treated as JSX files. Default is `[".jsx", ".tsx"]`.
- `ignoreFilesWithoutCode`: When set to `true`, this rule will ignore files that do not contain JSX syntax. Default is `true`.

## Rule Options Examples

```js filename="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename-extension": ["warn", "as-needed"]
  }
];
```

```js filename="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename-extension": ["warn", { "allow": "always" }]
  }
];
```

```js filename="eslint.config.js"
// ...
export default [
  // ...
  {
    files: ["**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename-extension": ["warn", "always"],
    },
  },
  {
    files: ["src/**/use*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename-extension": [
        "warn",
        "as-needed",
      ],
    },
  },
  {
    files: ["fixtures/**/*.tsx"],
    rules: {
      "@eslint-react/naming-convention/filename-extension": "off",
    },
  },
];
```
