export type BindingKind =
  | "var" /* var declarator */
  | "let" /* let declarator, class declaration id, catch clause parameters */
  | "const" /* const/using/await using declarator */
  | "module" /* import specifiers */
  | "hoisted" /* function declaration id */
  | "param" /* function declaration parameters */
  | "local" /* function expression id, class expression id */
  | "unknown"; /* export specifiers */
