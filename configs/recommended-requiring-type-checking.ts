import mod from "../index";

export default {
    plugins: {
        "react-ts": mod,
    },
    rules: mod.configs["recommended-requiring-type-checking"].rules,
};
