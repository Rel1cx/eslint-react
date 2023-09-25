// Rule name primitive definition

export type Namespace = "compat" | "debug" | "hooks" | "jsx" | "naming-convention";

type No = "no";

export type PositiveModifier = "ensure" | "prefer" | "strict";

export type NegativeModifier = "prevent" | No;

export type Modifier = NegativeModifier | PositiveModifier;

export type NegativeDescriptive =
    // | "complicated"
    // | "confusing"
    | "constructed"
    | "dangerously"
    | "deprecated"
    // | "duplicate"
    // | "empty"
    // | "extra"
    // | "falsely"
    // | "implicit"
    // | "incompatible"
    // | "invalid"
    | "leaked"
    | "legacy"
    | "missing"
    | "misused"
    // | "mixing"
    // | "outdated"
    // | "redundant"
    // | "restricted"
    | "suppressing"
    // | "suspicious"
    | "unescaped"
    // | "uninitialized"
    // | "unknown"
    // | "unreachable"
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
    | "block"
    | "boolean"
    | "cache"
    | "callback"
    | "children"
    | "class"
    | "class-component"
    | "class-method"
    | "class-property"
    | "clone-element"
    | "comment"
    | "component"
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
    | "createRef"
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
    | "nested-components"
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
    | `${No}-${Term}`
    | `${No}-${Term}-${Additional}`
    | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}`
    | `${PositiveModifier}-${NeutralDescriptive | PositiveDescriptive}-${Term}-${Additional}`
    | `${PositiveModifier}-${Term}`
    | `${PositiveModifier}-${Term}-${Additional}`;
