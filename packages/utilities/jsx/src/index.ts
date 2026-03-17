// --- Types ------------------------------------------------------------------
export type { ElementTest } from "./is-element";
export type { JsxAttributeValue } from "./jsx-attribute-value";
export type { JsxConfig } from "./jsx-config";

// --- Constants & Config -----------------------------------------------------
export { JsxEmit, getJsxConfig, getJsxConfigFromAnnotation, getJsxConfigFromCompilerOptions } from "./jsx-config";
export { DEFAULT_JSX_DETECTION_HINT, JsxDetectionHint } from "./jsx-detection-hint";

// --- Element Utilities ------------------------------------------------------
export { getElementSelfName, getElementType } from "./get-element-type";
export { isElement } from "./is-element";
export { isFragmentElement } from "./is-fragment-element";
export { isHostElement } from "./is-host-element";
export { isJsxLike } from "./is-jsx-like";
export { isJsxText } from "./is-jsx-text";

// --- Attribute Utilities ----------------------------------------------------
export { findAttribute } from "./find-attribute";
export { findParentAttribute } from "./find-parent-attribute";
export { getAttributeName } from "./get-attribute-name";
export { getAttributeStaticValue } from "./get-attribute-static-value";
export { getAttributeValue } from "./get-attribute-value";
export { hasAnyAttribute } from "./has-any-attribute";
export { hasAttribute } from "./has-attribute";
export { hasEveryAttribute } from "./has-every-attribute";
export { resolveAttributeValue } from "./resolve-attribute-value";

// --- Children Utilities -----------------------------------------------------
export { getChildren } from "./get-children";
export { hasChildren } from "./has-children";

// --- Text Utilities ---------------------------------------------------------
export { isWhitespace, isWhitespaceText } from "./is-whitespace";
export { toText } from "./to-text";
