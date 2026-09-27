# React DOM + Oxlint (without ESLint)

A minimal setup example for using ESLint React's rules through [Oxlint's JS plugins](https://oxc.rs/docs/guide/usage/linter/js-plugins) in a project that does not have the `eslint` package installed.

## Usage

```sh
npm install
npm run lint
```

## Notes

- Transitive peer requirements (for example from `@typescript-eslint/utils`) may still cause package managers to install ESLint automatically. With pnpm, you can prevent this:

  ```yaml
  # pnpm-workspace.yaml
  peerDependencyRules:
    ignoreMissing:
      - eslint
  ```

- Oxlint's JS plugins are currently in alpha; see the [Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/js-plugins) for the supported ESLint API surface.
