// Copied from https://github.com/epaew/eslint-plugin-filenames-simple/blob/master/src/utils/case-validator.ts
/* eslint-disable functional/no-classes */
/* eslint-disable functional/no-throw-statements */
/* eslint-disable no-restricted-syntax */
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-regexp */

export const splitName = (name: string): string[] => {
  return name
    .replaceAll("_", "-")
    .replaceAll(/([\da-z])([A-Z])|([A-Z])([A-Z])(?=[a-z])/gu, "$1$3-$2$4")
    .toLowerCase()
    .split("-");
};

interface Rule {
  expression: RegExp;
  recommendationBuilder?: (name: string) => string;
}

interface PresetRules {
  [key: string]: Required<Rule> | undefined;
  CONSTANT_CASE: Required<Rule>;
  PascalCase: Required<Rule>;
  camelCase: Required<Rule>;
  "kebab-case": Required<Rule>;
  snake_case: Required<Rule>;
}

export const presetRules: PresetRules = {
  PascalCase: {
    expression: /^[A-Z][\dA-Za-z]*$/u,
    recommendationBuilder: (name: string): string => {
      return splitName(name)
        .map((word) => {
          const [first, ...rest] = word;

          return `${first?.toUpperCase() ?? ""}${rest.join("")}`;
        })
        .join("");
    },
  },
  camelCase: {
    expression: /^[a-z][\dA-Za-z]*$/u,
    recommendationBuilder: (name: string): string => {
      return splitName(name)
        .map((word, i) => {
          if (i === 0) {
            return word;
          }

          const [first, ...rest] = word;

          return `${first?.toUpperCase() ?? ""}${rest.join("")}`;
        })
        .join("");
    },
  },
  "kebab-case": {
    expression: /^[a-z][\d\-a-z]*$/u,
    recommendationBuilder: (name: string): string => {
      return splitName(name).join("-");
    },
  },
  snake_case: {
    expression: /^[a-z][\d_a-z]*$/u,
    recommendationBuilder: (name: string): string => {
      return splitName(name).join("_");
    },
  },
  // eslint-disable-next-line perfectionist/sort-objects
  CONSTANT_CASE: {
    expression: /^[A-Z][\d_A-Z]*$/u,
    recommendationBuilder: (name: string): string => {
      return splitName(name).join("_").toUpperCase();
    },
  },
};

export const getRule = (expression: string, preset = presetRules): Rule => {
  const rule = preset[expression];

  return rule ?? { expression: new RegExp(`^${expression}$`, "u") };
};

type RecommendationBuilder = (name: string) => string;

export class CaseValidator {
  readonly #expression: RegExp;

  readonly #ignorePatterns: RegExp[];

  readonly #recommendationBuilder: RecommendationBuilder;

  constructor(
    expression: RegExp,
    ignorePatterns: RegExp[],
    recommendationBuilder: RecommendationBuilder = () => {
      throw new Error("Not implemented");
    },
  ) {
    this.#expression = expression;
    this.#ignorePatterns = ignorePatterns;
    this.#recommendationBuilder = recommendationBuilder;
  }

  getRecommendedName(name: string): string {
    const recommendedName = this.#recommendationBuilder(name);
    if (this.#expression.test(recommendedName)) {
      return recommendedName;
    }

    throw new Error("Failed to build recommendation.");
  }

  validate(name: string): boolean {
    if (this.#ignorePatterns.some((re) => re.test(name))) {
      return true;
    }

    return this.#expression.test(name);
  }
}

export const getCaseValidator = (ruleName: string, ignorePattern: string[] = []): CaseValidator => {
  const { expression, recommendationBuilder } = getRule(ruleName);

  return new CaseValidator(
    expression,
    ignorePattern.map((pattern) => new RegExp(`^${pattern}$`, "u")),
    recommendationBuilder,
  );
};
