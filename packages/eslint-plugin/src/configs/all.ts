import mod from "../index";

export default {
    plugins: {
        "react-ts": mod,
    },
    rules: mod.configs.all.rules,
};
