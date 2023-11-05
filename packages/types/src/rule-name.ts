// Rule name primitive definitions, used to guide rule naming.
// The plural nouns are used only when there is a clear indication of multiple things.
// Most of the terms are taken from the React glossary on https://react.dev.
// This file is also used to help GitHub copilot suggest rule names.

export type Namespace = "compat" | "debug" | "experimental" | "hooks" | "jsx" | "naming-convention";

export type PositiveModifier = "ensure" | "prefer" | "strict";

export type NegativeModifier = "no";

export type NeutralModifier = "max" | "min";

export type Modifier = NegativeModifier | NeutralModifier | PositiveModifier;

export type NegativeDescriptive =
  | "complicated"
  | "confusing"
  | "constructed"
  | "dangerously"
  | "deprecated"
  | "duplicate"
  | "empty"
  | "extra"
  | "falsely"
  | "implicit"
  | "incompatible"
  | "invalid"
  | "leaked"
  | "legacy"
  | "missing"
  | "misused"
  | "mixing"
  | "nested"
  | "outdated"
  | "redundant"
  | "restricted"
  | "suppressing"
  | "suspicious"
  | "unescaped"
  | "uninitialized"
  | "unknown"
  | "unreachable"
  | "unsafe"
  | "unstable"
  | "unused"
  | "useless";

export type PositiveDescriptive = "explicit" | "optimal" | "optimized" | "standard" | "strict";

export type NeutralDescriptive =
  | "access"
  | "calling"
  | "inside"
  | "outside";

export type Descriptive = NegativeDescriptive | NeutralDescriptive | PositiveDescriptive;

// Comment out unused terms to reduce the type checking overhead
export type Term =
  | "argument"
  | "array"
  | "array-index"
  | "arrow-function"
  | "attribute"
  | "callback"
  | "children"
  | "class"
  | "class-component"
  | "class-method"
  | "class-property"
  | "clone-element"
  | "comment"
  | "component"
  | "components"
  | "computed"
  | "computed-property"
  | "conditional-rendering"
  | "const"
  | "constant"
  | "constructor"
  | "context"
  | "context-consumer"
  | "context-provider"
  | "context-value"
  | "create-ref"
  | "custom-hooks"
  | "default-props"
  | "deps"
  | "destructuring"
  | "destructuring-assignment"
  | "direct-mutation"
  | "display-name"
  | "document"
  | "effect"
  | "element"
  | "entities"
  | "error"
  | "event"
  | "event-handler"
  | "exhaustive-deps"
  | "expression"
  | "false"
  | "filename"
  | "forward-ref"
  | "fragment"
  | "function"
  | "function-component"
  | "function-name"
  | "global"
  | "handler"
  | "hook"
  | "html"
  | "id"
  | "index"
  | "input"
  | "key"
  | "literal"
  | "map"
  | "memo"
  | "memoized-function"
  | "method"
  | "name"
  | "namespace"
  | "node"
  | "parameter"
  | "prop"
  | "react"
  | "ref"
  | "render"
  | "return"
  | "spread"
  | "state"
  | "string"
  | "string-refs"
  | "style"
  | "textnodes"
  | "use-callback"
  | "use-context"
  | "use-effect"
  | "use-imperative-handle"
  | "use-layout-effect"
  | "use-memo"
  | "use-reducer"
  | "use-ref"
  | "use-state"
  | "value"
  | "variable";

export type Additional = string;

export type RuleName =
  | `${NegativeModifier}-${NegativeDescriptive | NeutralDescriptive}-${Term}`
  | `${NegativeModifier}-${NegativeDescriptive | NeutralDescriptive}-${Term}-${Additional}`
  | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}`
  | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}-${Additional}`
  | `${PositiveModifier}-${Term}`
  | `${PositiveModifier}-${Term}-${Additional}`
  // eslint-disable-next-line perfectionist/sort-union-types
  | `${NegativeModifier | NeutralModifier}-${Term}`
  | `${NegativeModifier | NeutralModifier}-${Term}-${Additional}`;

// Example rule names
const _: RuleName = "no-constructed-context-value";
