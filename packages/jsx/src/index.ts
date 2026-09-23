export { type AttributeDescriptor, type AttributeSource, getAttributeDescriptor, resolveAttribute } from "./attribute-descriptor";
export { findAttribute, findParentAttribute, findSpreadProperty } from "./attribute-find";
export { hasAnyAttribute, hasAttribute, hasEveryAttribute } from "./attribute-has";
export { getAttributeName, isAttribute } from "./attribute-name";
export {
  type AttributeStaticValue,
  type AttributeValue,
  evaluateAttributeValue,
  getAttributeStaticValue,
  getAttributeValue,
  resolveAttributeValue,
} from "./attribute-value";

export { getChildren, hasChildren } from "./children";

export { type ElementDescriptor, resolveElement } from "./element-descriptor";
export { type ElementTest, isElement, isFragmentElement, isHostElement } from "./element-is";
export { getElementFullType, getElementSelfType } from "./element-type";

export { collapseMultilineText, isEmptyStringExpression, isPaddingWhitespace, isWhitespaceText } from "./text";
