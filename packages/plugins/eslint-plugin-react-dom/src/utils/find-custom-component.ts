import type { CustomComponentNormalized, CustomComponentPropNormalized } from "@eslint-react/shared";

/**
 * Finds a custom component by name from the provided array of components.
 *
 * @param name - The name of the component to find
 * @param components - Array of normalized custom components to search through
 * @returns The matching component if found, undefined otherwise
 */
export function findCustomComponent(name: string, components: CustomComponentNormalized[]) {
  return components
    .findLast((c) => c.name === name || c.re.test(name));
}

/**
 * Finds a custom component prop by its "as" name.
 *
 * @param name - The name to match against the prop's "as" property
 * @param props - Array of normalized custom component props to search through
 * @returns The matching prop if found, undefined otherwise
 */
export function findCustomComponentProp(name: string, props: CustomComponentPropNormalized[]) {
  return props
    .findLast((a) => a.as === name);
}
