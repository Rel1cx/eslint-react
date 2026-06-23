type Entry<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];

export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj);
}

export function entries<T extends Record<string, unknown>>(obj: T): Entry<T>[] {
  // @ts-expect-error - `Object.entries()` returns `[string, V][]`; we narrow the key type to `keyof T`.
  return Object.entries(obj);
}

export function fromEntries<K extends string, V>(pairs: readonly (readonly [K, V])[]): Record<K, V> {
  // @ts-expect-error - `Object.fromEntries()` returns `Record<string, V>`; we narrow the key type to `K`.
  return Object.fromEntries(pairs);
}

export const PLUGIN_DOMAINS = [
  "x",
  "jsx",
  "rsc",
  "dom",
  "web-api",
  "naming-convention",
  "debug",
] as const;

export type PluginDomain = (typeof PLUGIN_DOMAINS)[number];

export interface DomainMeta {
  readonly key: PluginDomain;
  readonly heading: string;
  readonly packageName: string;
  readonly prefix: string;
  readonly websiteFileName: (ruleName: string) => string;
}

export const DOMAIN_METAS: readonly DomainMeta[] = [
  {
    key: "x",
    heading: "X Rules",
    packageName: "eslint-plugin-react-x",
    prefix: "",
    websiteFileName: (ruleName) => ruleName,
  },
  {
    key: "jsx",
    heading: "JSX Rules",
    packageName: "eslint-plugin-react-jsx",
    prefix: "jsx-",
    websiteFileName: (ruleName) => `jsx-${ruleName}`,
  },
  {
    key: "rsc",
    heading: "RSC Rules",
    packageName: "eslint-plugin-react-rsc",
    prefix: "rsc-",
    websiteFileName: (ruleName) => `rsc-${ruleName}`,
  },
  {
    key: "dom",
    heading: "DOM Rules",
    packageName: "eslint-plugin-react-dom",
    prefix: "dom-",
    websiteFileName: (ruleName) => `dom-${ruleName}`,
  },
  {
    key: "web-api",
    heading: "Web API Rules",
    packageName: "eslint-plugin-react-web-api",
    prefix: "web-api-",
    websiteFileName: (ruleName) => `web-api-${ruleName}`,
  },
  {
    key: "naming-convention",
    heading: "Naming Convention Rules",
    packageName: "eslint-plugin-react-naming-convention",
    prefix: "naming-convention-",
    websiteFileName: (ruleName) => `naming-convention-${ruleName}`,
  },
  {
    key: "debug",
    heading: "Debug Rules",
    packageName: "eslint-plugin-react-debug",
    prefix: "debug-",
    websiteFileName: (ruleName) => `debug-${ruleName}`,
  },
] as const;

export const DOMAIN_META_BY_KEY = fromEntries(DOMAIN_METAS.map((m) => [m.key, m] as const));

export const EXCLUDED_VERIFY_DOMAINS = new Set<PluginDomain>(["debug"]);

export function buildPluginPrefix(domain: PluginDomain): string {
  return `react-${domain}`;
}

export function buildConfigKey(domain: PluginDomain, ruleName: string): string {
  return `@eslint-react/${DOMAIN_META_BY_KEY[domain].prefix}${ruleName}`;
}

export function buildRuleFileName(domain: PluginDomain, ruleName: string): string {
  return DOMAIN_META_BY_KEY[domain].websiteFileName(ruleName);
}

export function parseRuleFileName(fileName: string): { domain: PluginDomain; ruleName: string } | null {
  for (const meta of [...DOMAIN_METAS].reverse()) {
    if (meta.key !== "x" && fileName.startsWith(meta.prefix)) {
      return { domain: meta.key, ruleName: fileName.slice(meta.prefix.length) };
    }
  }
  return { domain: "x", ruleName: fileName };
}
