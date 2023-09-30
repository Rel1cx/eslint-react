[eslint-plugin-react-ts](../README.md) / src/utils/construction-detector

# Module: src/utils/construction-detector

## Table of contents

### Type Aliases

- [ConstructionDetail](src_utils_construction_detector.md#constructiondetail)

## Type Aliases

### ConstructionDetail

Ƭ **ConstructionDetail**: `Readonly`<{ `type`: ``"NONE"``  } \| { `node`: `TSESTree.ArrayExpression` ; `type`: ``"ARRAY"``  } \| { `node`: `TSESTree.Node` ; `type`: ``"ASSIGNMENT_EXPRESSION"`` ; `usage`: `TSESTree.Node`  } \| { `node`: `TSESTree.ClassExpression` ; `type`: ``"CLASS_EXPRESSION"``  } \| { `node`: `TSESTree.FunctionDeclaration` ; `type`: ``"FUNCTION_DECLARATION"`` ; `usage`: `TSESTree.Expression` \| `TSESTree.Identifier`  } \| { `node`: `TSESTree.ArrowFunctionExpression` \| `TSESTree.FunctionExpression` ; `type`: ``"FUNCTION_EXPRESSION"``  } \| { `node`: `TSESTree.JSXElement` ; `type`: ``"JSX_ELEMENT"``  } \| { `node`: `TSESTree.JSXFragment` ; `type`: ``"JSX_FRAGMENT"``  } \| { `node`: `TSESTree.NewExpression` ; `type`: ``"NEW_EXPRESSION"``  } \| { `node`: `TSESTree.ObjectExpression` ; `type`: ``"OBJECT_EXPRESSION"``  } \| { `node`: `TSESTree.Literal` ; `type`: ``"REGULAR_EXPRESSION"``  }\>
