import mod from "../index";

export default {
    plugins: {
        "react-ts": mod,
    },
    rules: mod.configs["recommended-type-checked"].rules,
};
