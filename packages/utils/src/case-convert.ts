import { camelCase, constantCase, kebabCase, pascalCase, snakeCase } from "string-ts";

const converters = {
  CONSTANT_CASE: constantCase,
  PascalCase: pascalCase,
  camelCase,
  "kebab-case": kebabCase,
  snake_case: snakeCase,
} as const;

// eslint-disable-next-line security/detect-object-injection
export const getCaseConverter = (rule: keyof typeof converters) => converters[rule];
