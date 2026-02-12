# ESLint React Test Samples

This directory contains test components that demonstrate the usage (good and bad patterns) of ESLint React rules.

## Structure

```
samples/
├── react-x/                # eslint-plugin-react-x rules
├── react-rsc/              # eslint-plugin-react-rsc rules
├── react-dom/              # eslint-plugin-react-dom rules
├── react-web-api/          # eslint-plugin-react-web-api rules
├── react-hooks-extra/      # eslint-plugin-react-hooks-extra rules
├── react-naming-convention/# eslint-plugin-react-naming-convention rules
├── index.ts               # Exports all test samples
└── README.md              # This file
```

## Usage

Each test file contains:

- **❌ Bad**: Examples that violate the rule
- **✅ Good**: Examples that follow the rule correctly

Run ESLint to see which patterns trigger warnings/errors:

```bash
cd examples/react-dom-test-samples
pnpm lint
```

## Pattern Conventions

1. Bad examples are prefixed with `Bad` or contain comments indicating they are bad
2. Good examples are prefixed with `Good` or contain comments indicating they are good
3. Each example is self-contained and exportable
4. TypeScript errors are suppressed with `@ts-expect-error` where necessary to demonstrate invalid patterns
