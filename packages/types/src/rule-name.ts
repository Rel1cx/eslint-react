/* eslint-disable @typescript-eslint/no-unused-vars */
// Rule name primitive definitions, used to guide rule naming.
// The plural nouns are used only when there is a clear indication of multiple things.
// Most of the terms are taken from the React glossary on https://react.dev.
// This file is also used to help GitHub copilot suggest rule names.

type Ban = "ban";

type PositiveModifier = "ensure" | "prefer" | "strict";

type NegativeModifier = "no";

type NeutralModifier = "max" | "min";

type Modifier = NegativeModifier | NeutralModifier | PositiveModifier;

type NegativeDescriptive =
  | "complicated"
  | "confusing"
  | "constructed"
  | "duplicate"
  | "empty"
  | "extra"
  | "falsely"
  | "implicit"
  | "invalid"
  | "leaked"
  | "legacy"
  | "missing"
  | "misused"
  | "mixing"
  | "nested"
  | "redundant"
  | "suppressing"
  | "suspicious"
  | "unknown"
  | "unreachable"
  | "unsafe"
  | "unsorted"
  | "unstable"
  | "unused"
  | "useless";

type PositiveDescriptive = "explicit" | "optimal" | "optimized" | "standard" | "strict";

type NeutralDescriptive =
  | "access"
  | "calling"
  | "inside"
  | "outside";

type Descriptive = NegativeDescriptive | NeutralDescriptive | PositiveDescriptive;

// Comment out unused terms to reduce the type checking overhead
type Term =
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
  | "list-rendering"
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

type Additional = string;

type RuleName =
  | `${Ban}-${Term}`
  | `${NeutralModifier}-${Term}`
  // eslint-disable-next-line perfectionist/sort-union-types
  | `${NegativeModifier}-${NegativeDescriptive}-${Term}`
  | `${NegativeModifier}-${NeutralDescriptive}-${Term}`
  | `${PositiveModifier}-${NeutralDescriptive}-${Term}`
  | `${PositiveModifier}-${PositiveDescriptive}-${Term}`;

type RuleNameWithAdditional = `${RuleName}-${Additional}`;

// Example rule names
const _: RuleName = "no-constructed-context-value";
