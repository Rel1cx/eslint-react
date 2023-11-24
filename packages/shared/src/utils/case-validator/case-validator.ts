/* eslint-disable functional/no-this-expressions */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-classes */
/* eslint-disable functional/no-throw-statements */
/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable security/detect-non-literal-regexp */
// Copied from https://github.com/epaew/eslint-plugin-filenames-simple/blob/master/src/utils/case-validator.ts
import { getRule } from "./preset-rules";

type RecommendationBuilder = (name: string) => string;

export class CaseValidator {
  readonly #expression: RegExp;

  readonly #ignorePatterns: RegExp[];

  readonly #recommendationBuilder: RecommendationBuilder;

  constructor(
    expression: RegExp,
    ignorePatterns: RegExp[],
    recommendationBuilder: RecommendationBuilder = () => {
      // eslint-disable-next-line functional-core/purity
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

    // eslint-disable-next-line functional-core/purity
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
