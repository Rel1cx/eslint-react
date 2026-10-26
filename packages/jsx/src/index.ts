export {
  type AttributeMatch,
  type AttributeTest,
  type AttributeValue,
  findAttribute,
  findParentAttribute,
  findSpreadProperty,
  getAttributeName,
  getAttributeStaticValue,
  getAttributeValue,
  hasAnyAttribute,
  hasAttribute,
  hasEveryAttribute,
  hasUnresolvableSpread,
  isAttributeNamed,
  isPlainAttribute,
  resolveAttributeStaticValue,
  resolveAttributeValue,
} from "./attribute";
export {
  getChildren,
  getMeaningfulChildren,
  hasMeaningfulChildren,
  isEmptyExpressionContainer,
  isEmptyStringExpression,
  isPaddingWhitespace,
  isWhitespaceText,
} from "./children";
export {
  type CreateElementCall,
  findCreateElementProp,
  isCreateElementCall,
  isCreateElementChildrenArgument,
  isInsideCreateElementProps,
  parseCreateElementCall,
} from "./create-element";
export { type ElementTest, getElementFullType, getElementSelfType, isElement, isFragmentElement, isHostElement } from "./element";
export { collapseMultilineText } from "./text";
