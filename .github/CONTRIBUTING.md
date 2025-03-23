# ESLint React Contributing Guide

> [!NOTE]\
> FYI: The ESLint Raect is not a fork of the `eslint-plugin-react` and meanwhile `eslint-plugin-react` is not the upstream of ESLint React.\
> Therefore, the rules and features you see in `eslint-plugin-react` may not necessarily appear in ESLint React and its plugins.

Hi! We, the maintainers, are really excited that you are interested in contributing to ESLint React.

Before submitting your contribution though, please make sure to take a moment and read through the [Code of Conduct](CODE_OF_CONDUCT.md), as well as the appropriate section for the contribution you intend to make:

- [ESLint React Contributing Guide](#eslint-react-contributing-guide)
  - [Issue Reporting Guidelines](#issue-reporting-guidelines)
  - [Pull Request Guidelines](#pull-request-guidelines)
  - [Development Guide](#development-guide)
    - [Packages Overview](#packages-overview)
      - [Internal Packages](#internal-packages)
        - [Utility Modules](#utility-modules)
        - [Core & Shared Modules](#core--shared-modules)
      - [Public Packages](#public-packages)
        - [ESLint Plugins](#eslint-plugins)
      - [Website & Playground](#website--playground)

## Issue Reporting Guidelines

- The issue list of this repo is **exclusively** for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have already been answered or even fixed in the development branch.

- Check if the issue is reproducible with the latest stable version of ESLint React packages. If you are using a pre-release, please indicate the specific version you are using.

- It is **required** that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

- Use only the minimum amount of code necessary to reproduce the unexpected behavior. A good bug report should isolate specific methods that exhibit unexpected behavior and precisely define how expectations were violated. What did you expect the method or methods to do, and how did the observed behavior differ? The more precisely you isolate the issue, the faster we can investigate.

- Issues with no clear repro steps will not be triaged. If an issue labeled "need repro" receives no further input from the issue author for more than 5 days, it will be closed.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

- Most importantly, we beg your patience: the team must balance your request against many other responsibilities — fixing other bugs, answering other questions, new features, new documentation, etc. The issue list is not paid support and we cannot make guarantees about how fast your issue can be resolved.

## Pull Request Guidelines

- **You have to [sign your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)**.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- If adding new feature:

  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix: #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR, or link to an issue that does.

## Development Guide

**NOTE: ESLint React is undergoing rapid development right now, and the docs may not reflect the current state of ESLint React. We are working hard to improve it.**

### Packages Overview

#### Local Packages

- `.pkgs/configs`: Local config bases for use in the workspace.
- `.pkgs/eslint-plugin-local`: Local ESLint plugin for use in the workspace.

#### Internal Packages

##### Utility Modules

- `packages/utilities/eff`: JavaScript and TypeScript utilities (previously some re-exports of the `effect` library).
- `packages/utilities/ast`: TSESTree AST utility module.
- `packages/utilities/var`: TSESTree AST utility module for static analysis of variables.
- `packages/utilities/jsx`: TSESTree AST utility module for static analysis of JSX.
- `packages/utilities/kit`: ESLint React's Plugin Kit for building plugins and rules.

##### Core & Shared Modules

- `packages/core`: Utility module for static analysis of React core APIs and patterns.
- `packages/shared`: Shared constants, types and functions.

#### Public Packages

##### ESLint Plugins

- `packages/plugins/eslint-plugin-react-x`: ESLint plugin for `"react"`.
- `packages/plugins/eslint-plugin-react-dom`: ESLint plugin for `"react-dom"`.
- `packages/plugins/eslint-plugin-react-web-api` - ESLint plugin for interacting with Web APIs.
- `packages/plugins/eslint-plugin-react-hooks-extra`: ESLint plugin for React Hooks related rules.
- `packages/plugins/eslint-plugin-react-naming-convention`: ESLint plugin for React naming conventions.
- `packages/plugins/eslint-plugin-react-debug`: ESLint plugin for debugging ESLint React rules.
- `packages/plugins/eslint-plugin`: The main ESLint plugin of ESLint React. Contains all the rules and config presets from the above plugins.

#### Website & Playground

- `apps/website`: The documentation website for ESLint React.
- `apps/playground`: The playground for ESLint React (WIP).
