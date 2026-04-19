# Website Changelog

All notable changes to the `apps/website` documentation and its content.

## Unreleased (changes since stable)

### ✨ New Features

- **Analyzer Configuration**
  - Added documentation for the new `additionalEffectHooks` analyzer setting, allowing custom hooks to be recognized as effect hooks via regex patterns.

- **Custom Rule Recipes**
  - Added `custom-rules-of-children` recipe with five ready-to-use rules: `noChildrenCount`, `noChildrenForEach`, `noChildrenMap`, `noChildrenOnly`, and `noChildrenToArray`.
  - Added `custom-rules-of-context` recipe with `noUseContext` rule, recommending React 19's `use` API over `useContext`.
  - Added `no-multiple-children-in-title` recipe to enforce a single string child in `<title>` elements.
  - Added `prefer-namespace-import` recipe with auto-fix support for converting default React imports to namespace imports.

- **Kit API Enhancements**
  - Documented **Anonymous Rules** support: anonymous functions passed to `.use()` now receive auto-generated random hex identifiers, making them resistant to disable comments.
  - Updated `RuleToolkit.is` API documentation to reflect the simplified surface (removal of pre-built identifier predicates; `*Call` variants and `API`/`APICall` factories are now the canonical approach).
  - Renamed initialization checkers: `initializedFromReact` → `APIFromReact`, `initializedFromReactNative` → `APIFromReactNative`.
  - Added `findParent` utility example in the component-hook-factories recipe.

- **Built-in Rules**
  - Documented `no-leaked-fetch` rule for `eslint-plugin-react-web-api`.
  - Documented `boolean-prop-naming` custom rule for enforcing boolean prop naming conventions.

- **Migration Guides**
  - Added complete migration examples for `boolean-prop-naming` (including TypeScript type-aware implementation), `no-set-state`, `no-string-refs`, and `function-component-definition`.
  - Added **"Requires type checking"** (💭) legend to the rule comparison table.

### 📝 Documentation

- **Diagrams**
  - Added new **Diagrams** page with an interactive Mermaid sequence diagram illustrating the `getFunctionComponentCollector` AST traversal flow.

- **Navigation & Layout**
  - Replaced static manual table-of-contents in migration guides with the `InlineTOC` component from `fumadocs-ui`.
  - Added `AutoClick` helper component to automatically dismiss promotional banners on the Kit docs page.

- **Content Updates**
  - Updated all internal GitHub links from `tree/stable` to `tree/main` to reflect the new default branch.
  - Updated monorepo package paths in `contributing.mdx` and `faq.mdx` (`packages/utilities/*` → `packages/*`, `packages/plugins/*` → `plugins/*`).
  - Added `marigold-ui/marigold` and `nodejs/nodejs.org` to the community projects list.
  - Updated minimum ESLint version requirement from `10.0.0` to `10.2.0` in getting-started guides.

### 🏗️ Internal

- Added `!diagrams` and `!examples` entries to `meta.json` navigation for cleaner sidebar grouping.
