import type { Linter } from "eslint";
export declare const GLOB_JS: string[];
export declare const GLOB_TS: string[];
export declare const GLOB_MD: string[];
export declare const GLOB_TESTS: string[];
export declare const GLOB_CONFIGS: string[];
export declare const GLOB_SCRIPTS: string[];
export declare const GLOB_IGNORES: readonly ["**/node_modules", "**/dist", "**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/bun.lockb", "**/output", "**/coverage", "**/temp", "**/.temp", "**/tmp", "**/.tmp", "**/.history", "**/.vitepress/cache", "**/.nuxt", "**/.next", "**/.vercel", "**/.changeset", "**/.idea", "**/.cache", "**/.output", "**/.vite-inspect", "**/.yarn", "**/storybook-static", "**/.eslint-config-inspector", "**/playwright-report", "**/.astro", "**/.vinxi", "**/app.config.timestamp_*.js", "**/.tanstack", "**/.nitro", "**/CHANGELOG*.md", "**/*.min.*", "**/LICENSE*", "**/__snapshots__", "**/auto-import?(s).d.ts", "**/components.d.ts", "**/vite.config.ts.*.mjs", "**/*.gen.*", "!.storybook"];
export declare const strictTypeChecked: Linter.Config[];
export declare const disableTypeChecked: Linter.Config[];
/**
 * Common ESLint JS rules to disable that are problematic when using TypeScript.
 */
export declare const disableProblemticEslintJsRules: Linter.Config;
