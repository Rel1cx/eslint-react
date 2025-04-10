import { name, version } from "../package.json";
import avoidShorthandBoolean from "./rules/avoid-shorthand-boolean";
import avoidShorthandFragment from "./rules/avoid-shorthand-fragment";
import jsxNoDuplicateProps from "./rules/jsx-no-duplicate-props";
import jsxNoUndef from "./rules/jsx-no-undef";
import jsxUsesReact from "./rules/jsx-uses-react";
import jsxUsesVars from "./rules/jsx-uses-vars";
import noAccessStateInSetstate from "./rules/no-access-state-in-setstate";
import noArrayIndexKey from "./rules/no-array-index-key";
import noChildrenCount from "./rules/no-children-count";
import noChildrenForEach from "./rules/no-children-for-each";
import noChildrenMap from "./rules/no-children-map";
import noChildrenOnly from "./rules/no-children-only";
import noChildrenProp from "./rules/no-children-prop";
import noChildrenToArray from "./rules/no-children-to-array";
import noClassComponent from "./rules/no-class-component";
import noCloneElement from "./rules/no-clone-element";
import noCommentTextnodes from "./rules/no-comment-textnodes";
import noComplexConditionalRendering from "./rules/no-complex-conditional-rendering";
import noComponentWillMount from "./rules/no-component-will-mount";
import noComponentWillReceiveProps from "./rules/no-component-will-receive-props";
import noComponentWillUpdate from "./rules/no-component-will-update";
import noContextProvider from "./rules/no-context-provider";
import noCreateRef from "./rules/no-create-ref";
import noDefaultProps from "./rules/no-default-props";
import noDirectMutationState from "./rules/no-direct-mutation-state";
import noDuplicateKey from "./rules/no-duplicate-key";
import noForwardRef from "./rules/no-forward-ref";
import noImplicitKey from "./rules/no-implicit-key";
import noLeakedConditionalRendering from "./rules/no-leaked-conditional-rendering";
import noMissingComponentDisplayName from "./rules/no-missing-component-display-name";
import noMissingContextDisplayName from "./rules/no-missing-context-display-name";
import noMissingKey from "./rules/no-missing-key";
import noMisusedCaptureOwnerStack from "./rules/no-misused-capture-owner-stack";
import noNestedComponentDefinitions from "./rules/no-nested-component-definitions";
import noPropTypes from "./rules/no-prop-types";
import noRedundantShouldComponentUpdate from "./rules/no-redundant-should-component-update";
import noSetStateInComponentDidMount from "./rules/no-set-state-in-component-did-mount";
import noSetStateInComponentDidUpdate from "./rules/no-set-state-in-component-did-update";
import noSetStateInComponentWillUpdate from "./rules/no-set-state-in-component-will-update";
import noStringRefs from "./rules/no-string-refs";
import noUnsafeComponentWillMount from "./rules/no-unsafe-component-will-mount";
import noUnsafeComponentWillReceiveProps from "./rules/no-unsafe-component-will-receive-props";
import noUnsafeComponentWillUpdate from "./rules/no-unsafe-component-will-update";
import noUnstableContextValue from "./rules/no-unstable-context-value";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";
import noUnusedClassComponentMembers from "./rules/no-unused-class-component-members";
import noUnusedState from "./rules/no-unused-state";
import noUseContext from "./rules/no-use-context";
import noUselessForwardRef from "./rules/no-useless-forward-ref";
import noUselessFragment from "./rules/no-useless-fragment";
import preferDestructuringAssignment from "./rules/prefer-destructuring-assignment";
import preferReactNamespaceImport from "./rules/prefer-react-namespace-import";
import preferReadOnlyProps from "./rules/prefer-read-only-props";
import preferShorthandBoolean from "./rules/prefer-shorthand-boolean";
import preferShorthandFragment from "./rules/prefer-shorthand-fragment";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "avoid-shorthand-boolean": avoidShorthandBoolean,
    "avoid-shorthand-fragment": avoidShorthandFragment,
    "no-access-state-in-setstate": noAccessStateInSetstate,
    "no-array-index-key": noArrayIndexKey,
    "no-children-count": noChildrenCount,
    "no-children-for-each": noChildrenForEach,
    "no-children-map": noChildrenMap,
    "no-children-only": noChildrenOnly,
    "no-children-prop": noChildrenProp,
    "no-children-to-array": noChildrenToArray,
    "no-class-component": noClassComponent,
    "no-clone-element": noCloneElement,
    "no-comment-textnodes": noCommentTextnodes,
    "no-complex-conditional-rendering": noComplexConditionalRendering,
    "no-component-will-mount": noComponentWillMount,
    "no-component-will-receive-props": noComponentWillReceiveProps,
    "no-component-will-update": noComponentWillUpdate,
    "no-context-provider": noContextProvider,
    "no-create-ref": noCreateRef,
    "no-default-props": noDefaultProps,
    "no-direct-mutation-state": noDirectMutationState,
    "no-duplicate-key": noDuplicateKey,
    "no-forward-ref": noForwardRef,
    "no-implicit-key": noImplicitKey,
    "no-leaked-conditional-rendering": noLeakedConditionalRendering,
    "no-missing-component-display-name": noMissingComponentDisplayName,
    "no-missing-context-display-name": noMissingContextDisplayName,
    "no-missing-key": noMissingKey,
    "no-misused-capture-owner-stack": noMisusedCaptureOwnerStack,
    "no-nested-component-definitions": noNestedComponentDefinitions,
    "no-prop-types": noPropTypes,
    "no-redundant-should-component-update": noRedundantShouldComponentUpdate,
    "no-set-state-in-component-did-mount": noSetStateInComponentDidMount,
    "no-set-state-in-component-did-update": noSetStateInComponentDidUpdate,
    "no-set-state-in-component-will-update": noSetStateInComponentWillUpdate,
    "no-string-refs": noStringRefs,
    "no-unsafe-component-will-mount": noUnsafeComponentWillMount,
    "no-unsafe-component-will-receive-props": noUnsafeComponentWillReceiveProps,
    "no-unsafe-component-will-update": noUnsafeComponentWillUpdate,
    "no-unstable-context-value": noUnstableContextValue,
    "no-unstable-default-props": noUnstableDefaultProps,
    "no-unused-class-component-members": noUnusedClassComponentMembers,
    "no-unused-state": noUnusedState,
    "no-use-context": noUseContext,
    "no-useless-forward-ref": noUselessForwardRef,
    "no-useless-fragment": noUselessFragment,
    "prefer-destructuring-assignment": preferDestructuringAssignment,
    "prefer-react-namespace-import": preferReactNamespaceImport,
    "prefer-read-only-props": preferReadOnlyProps,
    "prefer-shorthand-boolean": preferShorthandBoolean,
    "prefer-shorthand-fragment": preferShorthandFragment,

    // Part: JSX only rules
    "jsx-no-duplicate-props": jsxNoDuplicateProps,
    "jsx-no-undef": jsxNoUndef,
    "jsx-uses-react": jsxUsesReact,
    "jsx-uses-vars": jsxUsesVars,

    // Part: deprecated rules
    /** @deprecated Use `no-useless-forward-ref` instead */
    "ensure-forward-ref-using-ref": noUselessForwardRef,
    /** @deprecated Use `no-complex-conditional-rendering` instead */
    "no-complicated-conditional-rendering": noComplexConditionalRendering,
    /** @deprecated Use `jsx-no-duplicate-props` instead */
    "no-duplicate-jsx-props": jsxNoDuplicateProps,
    /** @deprecated Use `no-nested-component-definitions` instead */
    "no-nested-components": noNestedComponentDefinitions,
    /** @deprecated Use `jsx-uses-vars` instead */
    "use-jsx-vars": jsxUsesVars,
  },
} as const;
