# Website Changelog

All notable changes to the `apps/website` documentation and its content.

## Unreleased (changes since stable)

## v5.8.8 (2026-05-31)

### 📝 Documentation

- **Recipes**
  - Removed the `custom-rules-of-children` recipe; added cross-links to the remaining recipes.
  - Added the ℞ (prescription) prefix to recipe titles for visual consistency.
  - Cleaned up "See Also" sections across recipe documentation.
- **Migration Guides**
  - Reworked status emoji indicators across migration guides, rules index, and examples (#1816).
- **Kit**
  - Added `is.APICall` callout to the Kit API documentation, explaining the factory's unwrapping and member-expression resolution behavior (#1813).
- **Community**
  - Cleaned up the "Community Maintained Presets that use ESLint React" section.
- **Theme & Layout**
  - Updated website fonts and dropped the `data-theme` attribute.
  - Refreshed theme configuration.

### 🏗️ Internal

- Added redirects for moved rule documentation pages.
- Bumped `fumadocs` packages and `tinyexec`.

## v5.8.7 (2026-05-29)

### 📝 Documentation

- **FAQ Page**
  - Restructured FAQ from accordion layout to standard headings for better SEO, accessibility, and direct anchor linking.
  - Added new **"What does 90% human-written mean?"** section explaining the project's human/LLM collaboration policy.

- **Homepage**
  - Replaced the `Hint` popover component with a direct link to the new FAQ anchor (`/docs/faq#what-does-90-human-written-mean`).
  - Removed the now-unused `Hint` UI component.

## v5.7.6 (2026-05-12)

### ✨ New Features

- **Analyzer Configuration**
  - Added documentation for the new `additionalEffectHooks` analyzer setting, allowing custom hooks to be recognized as effect hooks via regex patterns.

- **Custom Rule Recipes**
  - Added `custom-rules-of-children` recipe with five ready-to-use rules: `noChildrenCount`, `noChildrenForEach`, `noChildrenMap`, `noChildrenOnly`, and `noChildrenToArray`.
  - Added `custom-rules-of-context` recipe with `noUseContext` rule, recommending React 19's `use` API over `useContext`.
  - Added `no-multiple-children-in-title` recipe to enforce a single string child in `<title>` elements.
  - Added `prefer-namespace-import` recipe with auto-fix support for converting default React imports to namespace imports.
  - Updated `custom-rules-of-state` recipe with consolidated conditional formatting, improved overview, and added "Using All Rules" section.

- **Kit API Enhancements**
  - Documented **Anonymous Rules** support: anonymous functions passed to `.use()` now receive auto-generated random hex identifiers, making them resistant to disable comments.
  - Documented `ast.findParent` utility for walking up the AST and returning the first matching ancestor.
  - Documented `ast.unwrap` for recursively stripping TypeScript type-expression wrappers (`TSAsExpression`, `TSSatisfiesExpression`, etc.) and `ChainExpression`.
  - Renamed initialization checkers: `initializedFromReact` → `APIFromReact`, `initializedFromReactNative` → `APIFromReactNative`.
  - Replaced `component-hook-factories` recipe example with `error-boundaries` custom rule example.
  - Updated `RuleToolkit.is` API documentation to reflect the simplified surface (removal of pre-built identifier predicates; `*Call` variants and `API`/`APICall` factories are now the canonical approach).
  - Updated anonymous function examples to use `Property` node checks for security-critical rules.

- **Built-in Rules**
  - Documented `boolean-prop-naming` custom rule for enforcing boolean prop naming conventions.
  - Documented `globals` rule for `eslint-plugin-react-x`.
  - Documented `no-leaked-fetch` rule for `eslint-plugin-react-web-api`.
  - Documented `static-components` rule for `eslint-plugin-react-x`.
  - Updated rules index to add `globals`, `no-unused-state`, and `static-components`; removed `component-hook-factories`.

- **Migration Guides**
  - Added **"Requires type checking"** (💭) legend to the rule comparison table.
  - Added anchor links to rule names in recipe documentation.
  - Added complete migration examples for `boolean-prop-naming` (including TypeScript type-aware implementation), `no-set-state`, `no-string-refs`, and `function-component-definition`.
  - Added migration overview page (`/docs/migration`) with sidebar entry, linking to `eslint-plugin-react` and `eslint-plugin-react-hooks` migration guides.
  - Updated `eslint-plugin-react` migration guide with **Supported via `@eslint-react/kit`** (🧰) legend and added `noDirectAccessProps` custom rule example for enforcing destructuring assignment.

- **Release Notes**
  - Added release notes page for v5.6.0 documenting core API refactoring, kit API simplification, removed rules, class component deprecation, and new rules.
  - Added release notes page for v5.7.0 documenting the `no-unused-state` rule, `all` preset fix, and various documentation improvements.

### 📝 Documentation

- **Diagrams**
  - Added **Rule Documentation Pipeline** flowchart illustrating how `update-website.ts` collects and generates rule documentation.
  - Added new **Diagrams** page with an interactive Mermaid sequence diagram illustrating the `getFunctionComponentCollector` AST traversal flow.
  - Removed unused diagram components (Config Inheritance, Release Automation Pipeline, Verification Data Flow).

- **Navigation & Layout**
  - Added `AutoClick` helper component to automatically dismiss promotional banners on the Kit docs page.
  - Added migration overview and release notes sections to sidebar `meta.json`.
  - Removed `component-hook-factories` from recipes index and meta.
  - Reordered redirects in `next.config.ts` with comments and alphabetical ordering.
  - Replaced static manual table-of-contents in migration guides with the `InlineTOC` component from `fumadocs-ui`.
  - Migrated the website to the **fumadocs solar theme**; removed the WIP Frutiger Aero variant and consolidated theme overrides into `app.override.css`.
  - Each rule documentation page now lists prior versions in a `Versions` accordion sourced from per-rule `CHANGELOG.md`.
  - Updated rules `meta.json` and `index.mdx` to add/remove rules (`globals`, `no-unused-state`, `static-components` in; `component-hook-factories` out).

- **Content Updates**
  - Added `marigold-ui/marigold` and `nodejs/nodejs.org` to the community projects list.
  - Added the `mikoto` project to the community projects list.
  - Added **Resources** section with AST Explorer, ESLint Developer Guide, and TypeScript Compiler API links to kit-related documentation pages.
  - Updated AST Explorer links across documentation to use canonical full URLs.
  - Simplified boolean prop naming example with `ts.TypeFlags.BooleanLike`.
  - Updated FAQ to link Legacy Config and Flat Config documentation.
  - Updated `presets.mdx` to reflect `recommended` preset changes and added `disable-naming-convention` preset.
  - Updated `removed.md` with `component-hook-factories` removal info, improved table formatting, and fixed `no-unused-state` migration docs and removed rule reasons.
  - Updated all internal GitHub links from `tree/stable` to `tree/main` to reflect the new default branch.
  - Updated contributing architecture diagram to include Examples subgraph, `eslint-plugin-react-debug`, `packages/eslint`, `packages/kit`, and additional dependency links.
  - Updated minimum ESLint version requirement from `10.0.0` to `10.2.0` in getting-started guides.
  - Updated monorepo package paths in `contributing.mdx` and `faq.mdx` (`packages/utilities/*` → `packages/*`, `packages/plugins/*` → `plugins/*`).
  - Updated roadmap with v5.2.3–v5.5.1 changes: new `@eslint-react/eslint` package, new rules, collector renames, monorepo restructuring, and kit API changes.
  - Updated README badges to use `@eslint-react/core`.

### 🏗️ Internal

- Added `!diagrams` and `!examples` entries to `meta.json` navigation for cleaner sidebar grouping.
- Migrated website path aliases from `#/` to `@/` across app, components, and MDX files.
- Reformatted files with dprint formatter.
- Reorganized imports across the website codebase.
- Renamed the `verify:rule-docs` script to `verify:docs`.
- Removed unused `assets/logo.html` and `assets/react-icon.html`.
- Updated dependencies: `@typescript-eslint`, `ansis`, `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`, `lucide-react`, `postcss`, `tailwindcss`, `tailwind-merge`, `tsl-dx`, `@takumi-rs/image-response`, `uuid`, `vitest`.
