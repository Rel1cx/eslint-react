import type { CustomComponentNormalized, CustomComponentPropNormalized } from "@eslint-react/shared";

export function findCustomComponent(name: string, components: CustomComponentNormalized[]) {
  return components
    .findLast((c) => c.name === name || c.re.test(name));
}

export function findCustomComponentProp(name: string, props: CustomComponentPropNormalized[]) {
  return props
    .findLast((a) => a.as === name);
}
