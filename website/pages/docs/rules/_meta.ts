const mkSectionTitle = (title: string) => ({
  [`-${title}`]: {
    type: "separator",
    title,
  },
});

const mkHiddenPage = (title: string) => ({
  [title]: {
    title,
    display: "hidden",
  },
});

export default {
  overview: {
    title: "Overview",
    theme: {
      layout: "full",
    },
  },
  "---": {
    type: "separator",
  },
  "ensure-forward-ref-using-ref": "ensure-forward-ref-using-ref",
  "jsx-no-duplicate-props": "jsx-no-duplicate-props",
  "jsx-uses-vars": "jsx-uses-vars",
  "no-access-state-in-setstate": "no-access-state-in-setstate",
  "no-array-index-key": "no-array-index-key",
  "no-children-count": "no-children-count",
  "no-children-for-each": "no-children-for-each",
  "no-children-map": "no-children-map",
  "no-children-only": "no-children-only",
  "no-children-prop": "no-children-prop",
  "no-children-to-array": "no-children-to-array",
  "no-class-component": "no-class-component",
  "no-clone-element": "no-clone-element",
  "no-comment-textnodes": "no-comment-textnodes",
  "no-complex-conditional-rendering": "no-complex-conditional-rendering",
  "no-component-will-mount": "no-component-will-mount",
  "no-component-will-receive-props": "no-component-will-receive-props",
  "no-component-will-update": "no-component-will-update",
  "no-context-provider": "no-context-provider",
  "no-create-ref": "no-create-ref",
  "no-default-props": "no-default-props",
  "no-direct-mutation-state": "no-direct-mutation-state",
  "no-duplicate-key": "no-duplicate-key",
  "no-forward-ref": "no-forward-ref",
  "no-implicit-key": "no-implicit-key",
  "no-leaked-conditional-rendering": "no-leaked-conditional-rendering",
  "no-missing-component-display-name": "no-missing-component-display-name",
  "no-missing-key": "no-missing-key",
  "no-nested-components": "no-nested-components",
  "no-prop-types": "no-prop-types",
  "no-redundant-should-component-update": "no-redundant-should-component-update",
  "no-set-state-in-component-did-mount": "no-set-state-in-component-did-mount",
  "no-set-state-in-component-did-update": "no-set-state-in-component-did-update",
  "no-set-state-in-component-will-update": "no-set-state-in-component-will-update",
  "no-string-refs": "no-string-refs",
  "no-unsafe-component-will-mount": "no-unsafe-component-will-mount",
  "no-unsafe-component-will-receive-props": "no-unsafe-component-will-receive-props",
  "no-unsafe-component-will-update": "no-unsafe-component-will-update",
  "no-unstable-context-value": "no-unstable-context-value",
  "no-unstable-default-props": "no-unstable-default-props",
  "no-unused-class-component-members": "no-unused-class-component-members",
  "no-unused-state": "no-unused-state",
  "no-useless-fragment": "no-useless-fragment",
  "prefer-destructuring-assignment": "prefer-destructuring-assignment",
  "prefer-react-namespace-import": "prefer-react-namespace-import",
  "prefer-read-only-props": "prefer-read-only-props",
  "prefer-shorthand-boolean": "prefer-shorthand-boolean",
  "prefer-shorthand-fragment": "prefer-shorthand-fragment",
  ...mkHiddenPage("avoid-shorthand-boolean"),
  ...mkHiddenPage("avoid-shorthand-fragment"),
  ...mkSectionTitle("DOM Rules"),
  "dom-no-children-in-void-dom-elements": "no-children-in-void-dom-elements",
  "dom-no-dangerously-set-innerhtml": "no-dangerously-set-innerhtml",
  "dom-no-dangerously-set-innerhtml-with-children": "no-dangerously-set-innerhtml-with-children",
  "dom-no-find-dom-node": "no-find-dom-node",
  "dom-no-missing-button-type": "no-missing-button-type",
  "dom-no-missing-iframe-sandbox": "no-missing-iframe-sandbox",
  "dom-no-namespace": "no-namespace",
  "dom-no-render-return-value": "no-render-return-value",
  "dom-no-script-url": "no-script-url",
  "dom-no-unknown-property": "no-unknown-property",
  "dom-no-unsafe-iframe-sandbox": "no-unsafe-iframe-sandbox",
  "dom-no-unsafe-target-blank": "no-unsafe-target-blank",
  ...mkSectionTitle("Web API Rules"),
  "web-api-no-leaked-event-listener": "no-leaked-event-listener",
  "web-api-no-leaked-interval": "no-leaked-interval",
  "web-api-no-leaked-resize-observer": "no-leaked-resize-observer",
  "web-api-no-leaked-timeout": "no-leaked-timeout",
  ...mkSectionTitle("Hooks Extra Rules"),
  "hooks-extra-no-unnecessary-use-callback": "no-unnecessary-use-callback",
  "hooks-extra-no-unnecessary-use-memo": "no-unnecessary-use-memo",
  "hooks-extra-no-useless-custom-hooks": "no-useless-custom-hooks",
  "hooks-extra-no-direct-set-state-in-use-effect": "no-direct-set-state-in-use-effect",
  "hooks-extra-no-direct-set-state-in-use-layout-effect": "no-direct-set-state-in-use-layout-effect",
  "hooks-extra-prefer-use-state-lazy-initialization": "prefer-use-state-lazy-initialization",
  ...mkSectionTitle("Naming Convention Rules"),
  "naming-convention-component-name": "component-name",
  "naming-convention-filename": "filename",
  "naming-convention-filename-extension": "filename-extension",
  "naming-convention-use-state": "use-state",
  ...mkSectionTitle("Debug Rules"),
  "debug-class-component": "class-component",
  "debug-function-component": "function-component",
  "debug-hook": "hook",
  "debug-is-from-react": "is-from-react",
};
