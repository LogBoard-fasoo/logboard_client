module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true, // 추가
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react", "react-hooks"],
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended", "prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/prop-types": "off",
    },
};
