export const hdlAnimation = [
    "onAnimationStart",
    "onAnimationEnd",
    "onAnimationIteration",
] as const;

export const hdlClipboard = [
    "onCopy",
    "onCut",
    "onPaste",
] as const;

export const hdlComposition = [
    "onCompositionEnd",
    "onCompositionStart",
    "onCompositionUpdate",
];

export const hdlFocus = [
    "onFocus",
    "onBlur",
] as const;

export const hdlForm = [
    "onChange",
    "onInput",
    "onSubmit",
] as const;

export const hdlImage = [
    "onLoad",
    "onError",
];

export const hdlKeyboard = [
    "onKeyDown",
    "onKeyPress",
    "onKeyUp",
] as const;

export const hdlMedia = [
    "onAbort",
    "onCanPlay",
    "onCanPlayThrough",
    "onDurationChange",
    "onEmptied",
    "onEncrypted",
    "onEnded",
    "onError",
    "onLoadedData",
    "onLoadedMetadata",
    "onLoadStart",
    "onPause",
    "onPlay",
    "onPlaying",
    "onProgress",
    "onRateChange",
    "onSeeked",
    "onSeeking",
    "onStalled",
    "onSuspend",
    "onTimeUpdate",
    "onVolumeChange",
    "onWaiting",
] as const;

export const hdlMouse = [
    "onClick",
    "onContextMenu",
    "onDblClick",
    "onDoubleClick",
    "onDrag",
    "onDragEnd",
    "onDragEnter",
    "onDragExit",
    "onDragLeave",
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
] as const;

export const hdlSelection = [
    "onSelect",
] as const;

export const hdlTouch = [
    "onTouchCancel",
    "onTouchEnd",
    "onTouchMove",
    "onTouchStart",
] as const;

export const hdlTransition = [
    "onTransitionEnd",
] as const;

export const hdlScroll = [
    "onScroll",
] as const;

export const hdlWheel = [
    "onWheel",
] as const;

export default [
    ...hdlAnimation,
    ...hdlClipboard,
    ...hdlComposition,
    ...hdlFocus,
    ...hdlForm,
    ...hdlImage,
    ...hdlKeyboard,
    ...hdlMedia,
    ...hdlMouse,
    ...hdlSelection,
    ...hdlTouch,
    ...hdlTransition,
    ...hdlScroll,
    ...hdlWheel,
] as const;
