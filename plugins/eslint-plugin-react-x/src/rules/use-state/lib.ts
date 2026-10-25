// Allow primitive wrapper types, as they are not expensive to call without lazy initialization
export const LAZY_INIT_ALLOW_LIST = [
  "Boolean",
  "String",
  "Number",
];
