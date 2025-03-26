# ESLint React Contributing Guide

Thank you for your interest in contributing to ESLint React! This guide will help you understand how to contribute effectively.

> [!NOTE]
> ESLint React is not a fork of or derived from `eslint-plugin-react`. Features in `eslint-plugin-react` may not appear in ESLint React.

## Issue Reporting Guidelines

- **Search First** - Your issue may already be addressed
- **Verify Version** - Confirm reproducibility with the latest stable release
- **Clear Reproduction Steps Required** - Detailed steps to reproduce are essential
- **Minimal Code Example** - Provide only the code necessary to demonstrate the issue
- **Be Patient** - The team balances many responsibilities

## Pull Request Guidelines

- **Sign Your Commits** - Ensure your commits are signed
- **Multiple Small Commits Allowed** - GitHub will squash before merging
- **New Features** - Provide strong rationale, preferably with prior discussion
- **Bug Fixes** - Include `(fix: #xxxx)` in your PR title and detailed description

## Repository Structure

### Local Packages

- `.pkgs/configs`: Workspace config bases
- `.pkgs/eslint-plugin-local`: Internal workspace ESLint plugin

### Internal Packages

- **Utilities**
  - `packages/utilities/eff`: JavaScript and TypeScript utilities (previously some re-exports of the `effect` library)
  - `packages/utilities/ast`: TSESTree AST utility module for static analysis
  - `packages/utilities/var`: TSESTree AST utility module for static analysis of variables
  - `packages/utilities/jsx`: TSESTree AST utility module for static analysis of JSX
  - `packages/utilities/kit`: ESLint React's Plugin Kit for building plugins and rules
- **Core & Shared**
  - `packages/core`: Utility module for static analysis of React core APIs and patterns
  - `packages/shared`: Shared constants, types and functions

### Public Packages

- **ESLint Plugins**
  - `eslint-plugin-react-x`: Core React rules
  - `eslint-plugin-react-dom`: React DOM rules
  - `eslint-plugin-react-web-api`: Web API interaction rules
  - `eslint-plugin-react-hooks-extra`: Extra React Hooks rules
  - `eslint-plugin-react-naming-convention`: Naming convention rules
  - `eslint-plugin-react-debug`: Debugging rules for inspecting React patterns in code
  - `eslint-plugin`: Main plugin combining all rules and presets from the above packages

### Documentation

- `apps/website`: Documentation website
- `apps/playground`: Interactive playground (WIP)
