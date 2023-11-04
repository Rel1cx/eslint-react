// Source: https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js
// Commented out types are runtime only WorkTags that are not needed for static analysis purposes

export type ComponentType =
  | 0
  | 1
  // | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  // | 15
  | 16
  // | 17
  | 18
  | 19
  | 20;
// | 21
// | 22
// | 23
// | 24
// | 25
// | 26
// | 27

export const FunctionComponent = 0;
export const ClassComponent = 1;
// export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
// export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
// export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
// export const ScopeComponent = 21;
// export const OffscreenComponent = 22;
// export const LegacyHiddenComponent = 23;
// export const CacheComponent = 24;
// export const TracingMarkerComponent = 25;
// export const HostHoistable = 26;
// export const HostSingleton = 27;

export type HostComponentType = 0 | 1 | 2;

export const HostHTMLComponent = 0;

export const HostSVGComponent = 1;

export const HostWebComponent = 2;

// source: https://react.dev/reference/react-dom/components#all-html-components
export const HostHTMLComponentTypes = [
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
] as const;

// source: https://react.dev/reference/react-dom/components#all-svg-components
export const HostSVGComponentTypes = [
  "a",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "discard",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "hatch",
  "hatchpath",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "script",
  "set",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "title",
  "tspan",
  "use",
  "view",
] as const;

export function isHostHTMLComponentName(name: string) {
  return HostHTMLComponentTypes.includes(name as never);
}

export function isHostSVGComponentName(name: string) {
  return HostSVGComponentTypes.includes(name as never);
}

export function isHostWebComponentName() {
  // TODO: implement this following the spec in https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
}
