import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": ts,
        },
        rules: {
            ...ts.configs["eslint-recommended"].rules,
            ...ts.configs["recommended"].rules,
        },
    },
    react.configs["flat/recommended"],
];
