# ESLint x React Contributing Guide

Hi! We, the maintainers, are really excited that you are interested in contributing to ESLint x React.

Before submitting your contribution though, please make sure to take a moment and read through the [Code of Conduct](CODE_OF_CONDUCT.md), as well as the appropriate section for the contribution you intend to make:

Before adding your code to this project, please make sure you are passionate about what this project is doing and not just the project itself. And agree with the [design philosophy](../README.md#Philosophy) of this project.

ESLint x React does not accept contributions of a purely utilitarian nature.

- [ESLint x React Contributing Guide](#eslint-x-react-contributing-guide)
  - [Issue Reporting Guidelines](#issue-reporting-guidelines)
  - [Pull Request Guidelines](#pull-request-guidelines)
  - [Development Guide](#development-guide)
    - [Packages Overview](#packages-overview)
    - [Developing Rules](#developing-rules)
    - [Developing Core and Related Components](#developing-core-and-related-components)
      - [Building the documentation locally](#building-the-documentation-locally)

## Issue Reporting Guidelines

- The issue list of this repo is **exclusively** for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have already been answered or even fixed in the development branch.

- Check if the issue is reproducible with the latest stable version of ESLint x React packages. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

- Use only the minimum amount of code necessary to reproduce the unexpected behavior. A good bug report should isolate specific methods that exhibit unexpected behavior and precisely define how expectations were violated. What did you expect the method or methods to do, and how did the observed behavior differ? The more precisely you isolate the issue, the faster we can investigate.

- Issues with no clear repro steps will not be triaged. If an issue labeled "need repro" receives no further input from the issue author for more than 5 days, it will be closed.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

- Most importantly, we beg your patience: the team must balance your request against many other responsibilities — fixing other bugs, answering other questions, new features, new documentation, etc. The issue list is not paid support and we cannot make guarantees about how fast your issue can be resolved.

## Pull Request Guidelines

- You have to [sign your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- If adding new feature:

  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix: #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR, or link to an issue that does.

## Development Guide

**NOTE: ESLint x React is undergoing rapid development right now, and the docs may not reflect the current state of ESLint x React. We are working hard to improve it.**

### Packages Overview

- `@eslint-react/tools`: Std library and primitives.
- `@eslint-react/types`: Type definitions.
- `@eslint-react/shared`: Shared constants and utilities.
- `@eslint-react/ast`: TSESTree AST primitive utility module.
- `@eslint-react/jsx`: TSESTree AST utility module for static analysis of JSX.
- `@eslint-react/core`: ESLint utility module for static analysis of React core API and Patterns.
- `@eslint-react/eslint-plugin-jsx`: ESLint plugin for JSX related rules.
- `@eslint-react/eslint-plugin-react`: ESLint plugin for React related rules.
- `@eslint-react/eslint-plugin-react-hooks`: ESLint plugin for React Hooks related rules.
- `@eslint-react/eslint-plugin-debug`: ESLint plugin for debugging related rules.
- `@eslint-react/eslint-plugin-naming-convention`: ESLint plugin for naming convention related rules.
- `@eslint-react/eslint-plugin`: The main ESLint plugin of ESLint x React. Contains all the rules from the above plugins.

### Developing Rules

- The changes you are making to the rules are following the [Rule introduction or modification principles](../README.md#Philosophy#Rule-introduction-or-modification-principles).

- TODO: Add more info here

### Developing Core and Related Components

- TODO: Add more info here

#### Building the documentation locally

You can build the TypeDoc documentation locally running the following script:

```bash
pnpm run build:docs
```
