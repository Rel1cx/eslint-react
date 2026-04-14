// Ported from https://github.com/jsx-eslint/eslint-plugin-react/blob/master/lib/rules/no-unknown-property.js
import { type RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type CompareOperator, compare } from "compare-versions";

export type StringMap = Record<string, string>;
export type TagsMap = Record<string, string[]>;

/**
 * Map of standard HTML attributes to their React counterparts
 */
export const DOM_ATTRIBUTE_NAMES: StringMap = {
  "accept-charset": "acceptCharset",
  class: "className",
  crossorigin: "crossOrigin",
  for: "htmlFor",
  "http-equiv": "httpEquiv",
  nomodule: "noModule",
};

/**
 * Map of SVG attributes to their React camelCase equivalents
 */
export const SVGDOM_ATTRIBUTE_NAMES: StringMap = {
  "accent-height": "accentHeight",
  "alignment-baseline": "alignmentBaseline",
  "arabic-form": "arabicForm",
  "baseline-shift": "baselineShift",
  "cap-height": "capHeight",
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "color-interpolation": "colorInterpolation",
  "color-interpolation-filters": "colorInterpolationFilters",
  "color-profile": "colorProfile",
  "color-rendering": "colorRendering",
  "dominant-baseline": "dominantBaseline",
  "enable-background": "enableBackground",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-size-adjust": "fontSizeAdjust",
  "font-stretch": "fontStretch",
  "font-style": "fontStyle",
  "font-variant": "fontVariant",
  "font-weight": "fontWeight",
  "glyph-name": "glyphName",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  "horiz-adv-x": "horizAdvX",
  "horiz-origin-x": "horizOriginX",
  "image-rendering": "imageRendering",
  "letter-spacing": "letterSpacing",
  "lighting-color": "lightingColor",
  "marker-end": "markerEnd",
  "marker-mid": "markerMid",
  "marker-start": "markerStart",
  "overline-position": "overlinePosition",
  "overline-thickness": "overlineThickness",
  "paint-order": "paintOrder",
  "panose-1": "panose1",
  "pointer-events": "pointerEvents",
  "rendering-intent": "renderingIntent",
  "shape-rendering": "shapeRendering",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "strikethrough-position": "strikethroughPosition",
  "strikethrough-thickness": "strikethroughThickness",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "stroke-width": "strokeWidth",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "text-rendering": "textRendering",
  "underline-position": "underlinePosition",
  "underline-thickness": "underlineThickness",
  "unicode-bidi": "unicodeBidi",
  "unicode-range": "unicodeRange",
  "units-per-em": "unitsPerEm",
  "v-alphabetic": "vAlphabetic",
  "v-hanging": "vHanging",
  "v-ideographic": "vIdeographic",
  "v-mathematical": "vMathematical",
  "vector-effect": "vectorEffect",
  "vert-adv-y": "vertAdvY",
  "vert-origin-x": "vertOriginX",
  "vert-origin-y": "vertOriginY",
  "word-spacing": "wordSpacing",
  "writing-mode": "writingMode",
  "x-height": "xHeight",
  "xlink:actuate": "xlinkActuate",
  "xlink:arcrole": "xlinkArcrole",
  "xlink:href": "xlinkHref",
  "xlink:role": "xlinkRole",
  "xlink:show": "xlinkShow",
  "xlink:title": "xlinkTitle",
  "xlink:type": "xlinkType",
  "xml:base": "xmlBase",
  "xml:lang": "xmlLang",
  "xml:space": "xmlSpace",
};

/**
 * Map of attributes that are only valid on specific HTML tags
 */
export const ATTRIBUTE_TAGS_MAP: TagsMap = {
  abbr: ["th", "td"],
  align: [
    "applet",
    "caption",
    "col",
    "colgroup",
    "hr",
    "iframe",
    "img",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
  ], // deprecated, but known
  allowFullScreen: ["iframe", "video"],
  as: ["link"],
  autoPictureInPicture: ["video"],
  charset: ["meta"],
  checked: ["input"],
  controls: ["audio", "video"],
  controlsList: ["audio", "video"],
  // image is required for SVG support, all other tags are HTML.
  crossOrigin: ["script", "img", "video", "audio", "link", "image"],
  disablePictureInPicture: ["video"],
  disableRemotePlayback: ["audio", "video"],
  displaystyle: ["math"],
  // https://html.spec.whatwg.org/multipage/links.html#downloading-resources
  download: ["a", "area"],
  fill: [ // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill
    // Fill color
    "altGlyph",
    "circle",
    "ellipse",
    "g",
    "line",
    "marker",
    "mask",
    "path",
    "polygon",
    "polyline",
    "rect",
    "svg",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "use",
    // Animation final state
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "set",
  ],
  focusable: ["svg"],
  imageSizes: ["link"],
  imageSrcSet: ["link"],
  loop: ["audio", "video"],
  mozAllowFullScreen: ["iframe", "video"],
  muted: ["audio", "video"],
  noModule: ["script"],
  // Media events allowed only on audio and video tags, see https://github.com/facebook/react/blob/256aefbea1449869620fb26f6ec695536ab453f5/CHANGELOG.md#notable-enhancements
  onAbort: ["audio", "video"],
  onCancel: ["dialog"],
  onCanPlay: ["audio", "video"],
  onCanPlayThrough: ["audio", "video"],
  onClose: ["dialog"],
  onDurationChange: ["audio", "video"],
  onEmptied: ["audio", "video"],
  onEncrypted: ["audio", "video"],
  onEnded: ["audio", "video"],
  onError: ["audio", "video", "img", "link", "source", "script", "picture", "iframe"],
  onLoad: ["script", "img", "link", "picture", "iframe", "object", "source"],
  onLoadedData: ["audio", "video"],
  onLoadedMetadata: ["audio", "video"],
  onLoadStart: ["audio", "video"],
  onPause: ["audio", "video"],
  onPlay: ["audio", "video"],
  onPlaying: ["audio", "video"],
  onProgress: ["audio", "video"],
  onRateChange: ["audio", "video"],
  onResize: ["audio", "video"],
  onSeeked: ["audio", "video"],
  onSeeking: ["audio", "video"],
  onStalled: ["audio", "video"],
  onSuspend: ["audio", "video"],
  onTimeUpdate: ["audio", "video"],
  onVolumeChange: ["audio", "video"],
  onWaiting: ["audio", "video"],
  playsInline: ["video"],
  poster: ["video"],
  preload: ["audio", "video"],
  property: ["meta"],
  returnValue: ["dialog"],
  scrolling: ["iframe"],
  valign: ["tr", "td", "th", "thead", "tbody", "tfoot", "colgroup", "col"], // deprecated, but known
  viewBox: ["marker", "pattern", "svg", "symbol", "view"],
  webkitAllowFullScreen: ["iframe", "video"],
  webkitDirectory: ["input"],
};

/**
 * Single-word HTML/DOM properties
 */
export const DOM_PROPERTY_NAMES_ONE_WORD: string[] = [
  // Global attributes - can be used on any HTML/DOM element
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  "dir",
  "draggable",
  "hidden",
  "id",
  "lang",
  "nonce",
  "part",
  "slot",
  "style",
  "title",
  "translate",
  "inert",
  // Element specific attributes
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes (includes global attributes too)
  // To be considered if these should be added also to ATTRIBUTE_TAGS_MAP
  "accept",
  "action",
  "allow",
  "alt",
  "as",
  "async",
  "buffered",
  "capture",
  "challenge",
  "cite",
  "code",
  "cols",
  "content",
  "coords",
  "csp",
  "data",
  "decoding",
  "default",
  "defer",
  "disabled",
  "form",
  "headers",
  "height",
  "high",
  "href",
  "icon",
  "importance",
  "integrity",
  "kind",
  "label",
  "language",
  "loading",
  "list",
  "loop",
  "low",
  "manifest",
  "max",
  "media",
  "method",
  "min",
  "multiple",
  "muted",
  "name",
  "open",
  "optimum",
  "pattern",
  "ping",
  "placeholder",
  "poster",
  "preload",
  "profile",
  "rel",
  "required",
  "reversed",
  "role",
  "rows",
  "sandbox",
  "scope",
  "seamless",
  "selected",
  "shape",
  "size",
  "sizes",
  "span",
  "src",
  "start",
  "step",
  "summary",
  "target",
  "type",
  "value",
  "width",
  "wmode",
  "wrap",
  // SVG attributes
  // See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
  "accumulate",
  "additive",
  "alphabetic",
  "amplitude",
  "ascent",
  "azimuth",
  "bbox",
  "begin",
  "bias",
  "by",
  "clip",
  "color",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "direction",
  "display",
  "divisor",
  "dur",
  "dx",
  "dy",
  "elevation",
  "end",
  "exponent",
  "fill",
  "filter",
  "format",
  "from",
  "fr",
  "fx",
  "fy",
  "g1",
  "g2",
  "hanging",
  "height",
  "hreflang",
  "ideographic",
  "in",
  "in2",
  "intercept",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kerning",
  "local",
  "mask",
  "mode",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "path",
  "ping",
  "points",
  "r",
  "radius",
  "rel",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "scale",
  "seed",
  "slope",
  "spacing",
  "speed",
  "stemh",
  "stemv",
  "string",
  "stroke",
  "to",
  "transform",
  "u1",
  "u2",
  "unicode",
  "values",
  "version",
  "visibility",
  "widths",
  "x",
  "x1",
  "x2",
  "xmlns",
  "y",
  "y1",
  "y2",
  "z",
  // OpenGraph meta tag attributes
  "property",
  // React specific attributes
  "ref",
  "key",
  "children",
  // Non-standard
  "results",
  "security",
  // Video specific
  "controls",
];

/**
 * Multi-word (camelCase) HTML/DOM properties
 */
export const DOM_PROPERTY_NAMES_TWO_WORDS: string[] = [
  // Global attributes - can be used on any HTML/DOM element
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  "accessKey",
  "autoCapitalize",
  "autoFocus",
  "contentEditable",
  "enterKeyHint",
  "exportParts",
  "inputMode",
  "itemID",
  "itemRef",
  "itemProp",
  "itemScope",
  "itemType",
  "spellCheck",
  "tabIndex",
  // Element specific attributes
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes (includes global attributes too)
  // To be considered if these should be added also to ATTRIBUTE_TAGS_MAP
  "acceptCharset",
  "autoComplete",
  "autoPlay",
  "border",
  "cellPadding",
  "cellSpacing",
  "classID",
  "codeBase",
  "colSpan",
  "contextMenu",
  "dateTime",
  "encType",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "frameBorder",
  "hrefLang",
  "httpEquiv",
  "imageSizes",
  "imageSrcSet",
  "isMap",
  "keyParams",
  "keyType",
  "marginHeight",
  "marginWidth",
  "maxLength",
  "mediaGroup",
  "minLength",
  "noValidate",
  "onAnimationEnd",
  "onAnimationIteration",
  "onAnimationStart",
  "onBlur",
  "onChange",
  "onClick",
  "onContextMenu",
  "onCopy",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onCut",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onError",
  "onFocus",
  "onInput",
  "onKeyDown",
  "onKeyPress",
  "onKeyUp",
  "onLoad",
  "onWheel",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onPaste",
  "onScroll",
  "onSelect",
  "onSubmit",
  "onToggle",
  "onTransitionEnd",
  "radioGroup",
  "readOnly",
  "referrerPolicy",
  "rowSpan",
  "srcDoc",
  "srcLang",
  "srcSet",
  "useMap",
  "fetchPriority",
  // SVG attributes
  // See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
  "crossOrigin",
  "accentHeight",
  "alignmentBaseline",
  "arabicForm",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "calcMode",
  "capHeight",
  "clipPathUnits",
  "clipPath",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "diffuseConstant",
  "dominantBaseline",
  "edgeMode",
  "enableBackground",
  "fillOpacity",
  "fillRule",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "horizAdvX",
  "horizOriginX",
  "imageRendering",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "markerEnd",
  "markerMid",
  "markerStart",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "numOctaves",
  "overlinePosition",
  "overlineThickness",
  "panose1",
  "paintOrder",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "referrerPolicy",
  "refX",
  "refY",
  "rendering-intent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "shapeRendering",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textRendering",
  "textLength",
  "transformOrigin",
  "underlinePosition",
  "underlineThickness",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "vHanging",
  "vIdeographic",
  "vMathematical",
  "vectorEffect",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "viewBox",
  "viewTarget",
  "wordSpacing",
  "writingMode",
  "xHeight",
  "xChannelSelector",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlnsXlink",
  "xmlSpace",
  "yChannelSelector",
  "zoomAndPan",
  // Safari/Apple specific, no listing available
  "autoCorrect", // https://stackoverflow.com/questions/47985384/html-autocorrect-for-text-input-is-not-working
  "autoSave", // https://stackoverflow.com/questions/25456396/what-is-autosave-attribute-supposed-to-do-how-do-i-use-it
  // React specific attributes https://reactjs.org/docs/dom-elements.html#differences-in-attributes
  "className",
  "dangerouslySetInnerHTML",
  "defaultValue",
  "defaultChecked",
  "htmlFor",
  // Events' capture events
  "onBeforeInput",
  "onChange",
  "onInvalid",
  "onReset",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onResize",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",
  "onCopyCapture",
  "onCutCapture",
  "onPasteCapture",
  "onCompositionEndCapture",
  "onCompositionStartCapture",
  "onCompositionUpdateCapture",
  "onFocusCapture",
  "onBlurCapture",
  "onChangeCapture",
  "onBeforeInputCapture",
  "onInputCapture",
  "onResetCapture",
  "onSubmitCapture",
  "onInvalidCapture",
  "onLoadCapture",
  "onErrorCapture",
  "onKeyDownCapture",
  "onKeyPressCapture",
  "onKeyUpCapture",
  "onAbortCapture",
  "onCanPlayCapture",
  "onCanPlayThroughCapture",
  "onDurationChangeCapture",
  "onEmptiedCapture",
  "onEncryptedCapture",
  "onEndedCapture",
  "onLoadedDataCapture",
  "onLoadedMetadataCapture",
  "onLoadStartCapture",
  "onPauseCapture",
  "onPlayCapture",
  "onPlayingCapture",
  "onProgressCapture",
  "onRateChangeCapture",
  "onSeekedCapture",
  "onSeekingCapture",
  "onStalledCapture",
  "onSuspendCapture",
  "onTimeUpdateCapture",
  "onVolumeChangeCapture",
  "onWaitingCapture",
  "onSelectCapture",
  "onTouchCancelCapture",
  "onTouchEndCapture",
  "onTouchMoveCapture",
  "onTouchStartCapture",
  "onScrollCapture",
  "onWheelCapture",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationStartCapture",
  "onTransitionEndCapture",
  "onAuxClick",
  "onAuxClickCapture",
  "onClickCapture",
  "onContextMenuCapture",
  "onDoubleClickCapture",
  "onDragCapture",
  "onDragEndCapture",
  "onDragEnterCapture",
  "onDragExitCapture",
  "onDragLeaveCapture",
  "onDragOverCapture",
  "onDragStartCapture",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseMoveCapture",
  "onMouseOutCapture",
  "onMouseOverCapture",
  "onMouseUpCapture",
  // Video specific
  "autoPictureInPicture",
  "controlsList",
  "disablePictureInPicture",
  "disableRemotePlayback",
];

/**
 * DOM properties that are exempt from case sensitivity checks
 */
export const DOM_PROPERTIES_IGNORE_CASE: string[] = [
  "charset",
  "allowFullScreen",
  "webkitAllowFullScreen",
  "mozAllowFullScreen",
  "webkitDirectory",
];

/**
 * List of ARIA attributes
 */
export const ARIA_PROPERTIES: string[] = [
  // See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes
  // Global attributes
  "aria-atomic",
  "aria-braillelabel",
  "aria-brailleroledescription",
  "aria-busy",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-description",
  "aria-details",
  "aria-disabled",
  "aria-dropeffect",
  "aria-errormessage",
  "aria-flowto",
  "aria-grabbed",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-live",
  "aria-owns",
  "aria-relevant",
  "aria-roledescription",
  // Widget attributes
  "aria-autocomplete",
  "aria-checked",
  "aria-expanded",
  "aria-level",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-placeholder",
  "aria-pressed",
  "aria-readonly",
  "aria-required",
  "aria-selected",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  // Relationship attributes
  "aria-activedescendant",
  "aria-colcount",
  "aria-colindex",
  "aria-colindextext",
  "aria-colspan",
  "aria-posinset",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowindextext",
  "aria-rowspan",
  "aria-setsize",
];

/**
 * React-specific pointer event handlers added in React 16.4
 */
export const REACT_ON_PROPS: string[] = [
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerEnter",
  "onPointerEnterCapture",
  "onPointerLeave",
  "onPointerLeaveCapture",
  "onPointerMove",
  "onPointerMoveCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerUp",
  "onPointerUpCapture",
];

/**
 * Popover API properties added in React 19
 */
export const POPOVER_API_PROPS: string[] = [
  "popover",
  "popoverTarget",
  "popoverTargetAction",
  "onToggle",
  "onBeforeToggle",
];

/**
 * Tests React version against a comparator
 * @param context ESLint context
 * @param comparator Comparison operator
 * @param version Version to compare against
 * @returns Comparison result
 */
export function testReactVersion(
  context: RuleContext<string, unknown[]>,
  comparator: CompareOperator,
  version: string,
): boolean {
  const { version: localVersion } = getSettingsFromContext(context);
  return compare(localVersion, version, comparator);
}

/**
 * Gets all valid DOM property names based on React version
 * @param context ESLint rule context
 * @returns Array of valid DOM property names
 */
export function getDOMPropertyNames(context: RuleContext<string, unknown[]>): string[] {
  const ALL_DOM_PROPERTY_NAMES: string[] = DOM_PROPERTY_NAMES_TWO_WORDS.concat(DOM_PROPERTY_NAMES_ONE_WORD);

  // React version-specific property handling
  if (testReactVersion(context, "<=", "16.1.0")) {
    // allowTransparency was removed in React v16.1+
    ALL_DOM_PROPERTY_NAMES.push("allowTransparency");
    return ALL_DOM_PROPERTY_NAMES;
  }

  // Pointer events were added in React v16.4.0
  if (testReactVersion(context, ">=", "16.4.0")) {
    ALL_DOM_PROPERTY_NAMES.push(...REACT_ON_PROPS);
  }

  // Popover API props were added in React v19.0.0-rc.0
  if (testReactVersion(context, ">=", "19.0.0-rc.0")) {
    ALL_DOM_PROPERTY_NAMES.push(...POPOVER_API_PROPS);
  } else {
    ALL_DOM_PROPERTY_NAMES.push(...POPOVER_API_PROPS.map((prop) => prop.toLowerCase()));
  }

  return ALL_DOM_PROPERTY_NAMES;
}

/**
 * Check if a node's parent is a JSX tag that is written with lowercase letters,
 * and is not a custom web component.
 * @param childNode JSX element being tested
 * @returns Whether the node is a valid HTML tag in JSX
 */
export function isValidHTMLTagInJSX(childNode: TSESTree.JSXAttribute): boolean {
  const tagConvention = /^[a-z][^-]*$/;
  if (
    childNode.parent.name.type === AST.JSXIdentifier
    && tagConvention.test(childNode.parent.name.name)
  ) {
    return !childNode.parent.attributes.some((attrNode) =>
      attrNode.type === AST.JSXAttribute
      && attrNode.name.type === AST.JSXIdentifier
      && attrNode.name.name === "is"
    );
  }
  return false;
}

/**
 * Normalizes attribute names that should be case-insensitive
 * @param name Attribute name to normalize
 * @returns Normalized attribute name
 */
export function normalizeAttributeCase(name: string): string {
  return DOM_PROPERTIES_IGNORE_CASE.find((element) => element.toLowerCase() === name.toLowerCase()) ?? name;
}

/**
 * Check if an attribute name is a valid data-* attribute
 * @param name Attribute name to test
 * @returns Whether the attribute is a valid data attribute
 */
export function isValidDataAttribute(name: string): boolean {
  return !/^data-xml/i.test(name) && /^data-[^:]*$/.test(name);
}

/**
 * Check if an attribute name has uppercase characters
 * @param name Attribute name to test
 * @returns Whether the name has uppercase characters
 */
export function hasUpperCaseCharacter(name: string): boolean {
  return name.toLowerCase() !== name;
}

/**
 * Check if an attribute is a valid ARIA attribute
 * @param name Attribute name to test
 * @returns Whether the attribute is a valid ARIA attribute
 */
export function isValidAriaAttribute(name: string): boolean {
  return ARIA_PROPERTIES.some((element) => element === name);
}

/**
 * Gets the tag name for a JSXAttribute
 * @param node JSXAttribute to get tag name from
 * @returns Tag name or null
 */
export function getTagName(node: TSESTree.JSXAttribute): string | null {
  if (node.parent.name.type === AST.JSXIdentifier) {
    return node.parent.name.name;
  }
  return null;
}

/**
 * Check if the tag name has a dot (member expression)
 * @param node JSXAttribute to check
 * @returns Whether the tag name has a dot
 */
export function tagNameHasDot(node: TSESTree.JSXAttribute): boolean {
  return node.parent.name.type === AST.JSXMemberExpression;
}

/**
 * Check if an object has a property
 * @param obj Object to check
 * @param key Key to check for
 * @returns Whether the object has the property
 */
export function has(obj: StringMap | TagsMap, key: string): boolean {
  return Object.hasOwn(obj, key);
}

/**
 * Gets the standard name of an attribute
 * @param name Attribute name
 * @param context ESLint context
 * @returns Standard name or undefined
 */
export function getStandardName(name: string, context: RuleContext<string, unknown[]>): string | null {
  if (has(DOM_ATTRIBUTE_NAMES, name)) {
    return DOM_ATTRIBUTE_NAMES[name] ?? null;
  }
  if (has(SVGDOM_ATTRIBUTE_NAMES, name)) {
    return SVGDOM_ATTRIBUTE_NAMES[name] ?? null;
  }
  return getDOMPropertyNames(context).find((element) => element.toLowerCase() === name.toLowerCase()) ?? null;
}

/**
 * Gets text of a node
 * @param context ESLint context
 * @param node Node to get text from
 * @returns Node's text
 */
export function getText(
  context: RuleContext<string, unknown[]>,
  node: TSESTree.JSXIdentifier | TSESTree.JSXNamespacedName,
): string {
  return context.sourceCode.getText(node);
}
