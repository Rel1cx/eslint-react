import { REACT_BUILD_IN_HOOKS } from "@eslint-react/shared";
import { Link } from "next-view-transitions";

export const properties = {
  version: {
    description: <Link href="#version">React version to perform the analysis.</Link>,
    type: "string",
    default: "detect",
  },
  importSource: {
    description: <Link href="#importsource">The source where React is imported from.</Link>,
    type: "string",
    default: "react",
  },
  polymorphicPropName: {
    description: <Link href="#polymorphicpropname">The prop your code uses to create polymorphic components.</Link>,
    type: "string",
    default: "as",
  },
  additionalComponents: {
    description: <Link href="#additionalcomponents">An array of components and its attributes mapping.</Link>,
    type: "CustomComponent[]",
    typeDescription: `
        type CustomComponent = {
          name: string;
          as?: string;
          attributes?: {
            name: string;
            as?: string;
            defaultValue?: string;
          }[]
        }
      `,
    default: "[]",
  },
  additionalHooks: {
    description: <Link href="#additionalhooks">An object of aliases for React built-in Hooks.</Link>,
    type: "Record<ReactBuiltInHookName, string[]>",
    typeDescription: `
        type ReactBuiltInHookName = ${REACT_BUILD_IN_HOOKS.map(n => '"' + n + '"').join(" | ")}
      `,
    default: "{}",
  },
};
