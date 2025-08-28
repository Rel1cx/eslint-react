/*
 * This file contains types that are intentionally wide/inaccurate, that exist
 * for the purpose of satisfying both `defineConfig()` and `tseslint.config()`.
 * See https://github.com/typescript-eslint/typescript-eslint/issues/10899
 * See https://github.com/typescript-eslint/typescript-eslint/blob/3a65920088a37d5a28ebb6f36fb82b7a091d3cb1/packages/typescript-eslint/src/compatibility-types.ts
 */

export interface CompatiblePlugin {
  meta: {
    name: string;
    version: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: Record<string, any>;
}

export interface CompatibleConfig {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any>;
}
