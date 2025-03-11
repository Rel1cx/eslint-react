// eslint.ts
var templateIndentAnnotations = [
  "outdent",
  "dedent",
  "html",
  "tsx",
  "ts"
];
var p11tOptions = {
  type: "natural",
  ignoreCase: false
};
var p11tGroups = {
  customGroups: {
    id: ["^_$", "^id$", "^key$", "^self$"],
    type: ["^type$", "^kind$"],
    meta: [
      "^name$",
      "^meta$",
      "^title$",
      "^description$"
    ],
    alias: ["^alias$", "^as$"],
    rules: ["^node$", "^messageId$"]
  },
  groups: ["id", "type", "meta", "alias", "rules", "unknown"]
};
var typescript = {
  rules: {
    eqeqeq: ["error", "smart"],
    "no-console": "error",
    "no-else-return": "error",
    "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
    "no-implicit-coercion": ["error", { allow: ["!!"] }],
    "no-mixed-operators": "warn",
    "no-undef": "off",
    "prefer-object-has-own": "error",
    // Part: custom rules
    "no-restricted-syntax": [
      "error",
      {
        message: "no optional",
        selector: "TSPropertySignature[optional=true]"
      }
    ],
    // Part: typescript-eslint rules
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        minimumDescriptionLength: 5,
        "ts-check": false,
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true
      }
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-unnecessary-parameter-property-assignment": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "all" }],
    "@typescript-eslint/strict-boolean-expressions": ["error", {
      allowAny: false,
      allowNullableBoolean: false,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: true,
      allowString: false
    }],
    // Part: jsdoc rules
    "jsdoc/check-param-names": "warn",
    "jsdoc/check-tag-names": "warn",
    "jsdoc/informative-docs": "off",
    "jsdoc/lines-before-block": "off",
    "jsdoc/require-jsdoc": "off",
    "jsdoc/require-param": "warn",
    "jsdoc/require-param-description": "warn",
    "jsdoc/require-returns": "off",
    "jsdoc/require-yields": "warn",
    "jsdoc/tag-lines": "off",
    // Part: simple-import-sort rules
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    // Part: stylistic rules
    "@stylistic/arrow-parens": ["warn", "always"],
    "@stylistic/no-multi-spaces": ["warn"],
    "@stylistic/operator-linebreak": [
      "warn",
      "before"
    ],
    "@stylistic/quote-props": ["error", "as-needed"],
    // Part: perfectionist rules
    "perfectionist/sort-exports": "off",
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-interfaces": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups
      }
    ],
    "perfectionist/sort-intersection-types": "off",
    "perfectionist/sort-modules": "off",
    "perfectionist/sort-named-exports": "off",
    "perfectionist/sort-named-imports": "off",
    "perfectionist/sort-object-types": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups
      }
    ],
    "perfectionist/sort-objects": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups,
        partitionByComment: "^Part:.*"
      }
    ],
    "perfectionist/sort-switch-case": "off",
    "perfectionist/sort-union-types": "off",
    // Part: unicorn rules
    "unicorn/template-indent": [
      "warn",
      {
        comments: templateIndentAnnotations,
        tags: templateIndentAnnotations
      }
    ]
  }
};

export { typescript };
