---
title: Deprecated
description: Reference for deprecated rules and presets
full: true
---

## Rules

| Rule                                                                                                       | Replaced by                                                                          | Deprecated in |
| :--------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------ |
| [`ensure-custom-hooks-using-other-hooks`](/docs/rules/hooks-extra-no-useless-custom-hooks)                 | [`no-useless-custom-hooks`](/docs/rules/hooks-extra-no-useless-custom-hooks)         | 1.13.0        |
| [`ensure-forward-ref-using-ref`](/docs/rules/ensure-forward-ref-using-ref)                                 | [`no-useless-forward-ref`](/docs/rules/no-useless-forward-ref)                       | 1.33.0        |
| [`ensure-use-callback-has-non-empty-deps`](/docs/rules/hooks-extra-ensure-use-callback-has-non-empty-deps) | [`no-unnecessary-use-callback`](/docs/rules/hooks-extra-no-unnecessary-use-callback) | 1.13.0        |
| [`ensure-use-memo-has-non-empty-deps`](/docs/rules/hooks-extra-ensure-use-memo-has-non-empty-deps)         | [`no-unnecessary-use-memo`](/docs/rules/hooks-extra-no-unnecessary-use-memo)         | 1.13.0        |
| [`jsx-no-duplicate-props`](/docs/rules/jsx-no-duplicate-props)                                             | [`no-duplicate-jsx-props`](/docs/rules/no-duplicate-jsx-props)                       | 1.22.0        |
| [`jsx-uses-vars`](/docs/rules/jsx-uses-vars)                                                               | [`use-jsx-vars`](/docs/rules/use-jsx-vars)                                           | 1.22.0        |
| [`no-children-in-void-dom-elements`](/docs/rules/dom-no-children-in-void-dom-elements)                     | [`no-void-elements-with-children`](/docs/rules/dom-no-void-elements-with-children)   | 1.22.0        |
| [`no-complicated-conditional-rendering`](/docs/rules/no-complicated-conditional-rendering)                 | [`no-complex-conditional-rendering`](/docs/rules/no-complex-conditional-rendering)   | 1.6.0         |
| [`no-nested-components`](/docs/rules/no-nested-components)                                                 | [`no-nested-component-definitions`](/docs/rules/no-nested-component-definitions)     | 1.34.0        |
| [`no-redundant-custom-hook`](/docs/rules/hooks-extra-no-useless-custom-hooks)                              | [`no-useless-custom-hooks`](/docs/rules/hooks-extra-no-useless-custom-hooks)         | 1.21.0        |

## Presets

| Preset    | Replaced by   | Deprecated in |
| :-------- | :------------ | :------------ |
| `off-dom` | `disable-dom` | 1.10.0        |
