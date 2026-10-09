[@local/eff](../README.md) / Redactable

# Interface: Redactable

Interface for objects that provide context-aware redacted representations.

**Details**

The `[symbolRedactable]` method receives the current fiber's `Context`. If no
fiber is active, an empty `Context` is provided. In this vendored port the
context parameter is typed as `unknown` to avoid porting the `Context` module.

## Since

3.10.0

## Properties

| Property                                                    | Modifier   | Type                                |
| ----------------------------------------------------------- | ---------- | ----------------------------------- |
| <a id="property-symbolredactable"></a> `[symbolRedactable]` | `readonly` | (`context`: `unknown`) => `unknown` |
