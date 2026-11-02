[@local/testkit](../README.md) / tsconfigFixtures

# Variable: tsconfigFixtures

```ts
const tsconfigFixtures: {
  preact: "tsconfig.jsx-preact.json";
  preserve: "tsconfig.jsx-preserve.json";
  "react-classic": "tsconfig.jsx-react.json";
  "react-jsx": "tsconfig.json";
  "react-native": "tsconfig.jsx-react-native.json";
};
```

Registry of the tsconfig fixtures under the fixtures root directory,
keyed by the scenario they model. Adding a new scenario is a matter of
dropping a tsconfig file into the fixtures root and adding one entry here.

## Type Declaration

| Name                                                | Type                               | Default value                      | Description                                           |
| --------------------------------------------------- | ---------------------------------- | ---------------------------------- | ----------------------------------------------------- |
| <a id="property-preact"></a> `preact`               | `"tsconfig.jsx-preact.json"`       | `"tsconfig.jsx-preact.json"`       | Automatic JSX runtime with `jsxImportSource: preact`. |
| <a id="property-preserve"></a> `preserve`           | `"tsconfig.jsx-preserve.json"`     | `"tsconfig.jsx-preserve.json"`     | Preserved JSX (`jsx: preserve`).                      |
| <a id="property-react-classic"></a> `react-classic` | `"tsconfig.jsx-react.json"`        | `"tsconfig.jsx-react.json"`        | Classic JSX runtime (`jsx: react`).                   |
| <a id="property-react-jsx"></a> `react-jsx`         | `"tsconfig.json"`                  | `"tsconfig.json"`                  | Default automatic JSX runtime (`jsx: react-jsx`).     |
| <a id="property-react-native"></a> `react-native`   | `"tsconfig.jsx-react-native.json"` | `"tsconfig.jsx-react-native.json"` | React Native JSX transform (`jsx: react-native`).     |
