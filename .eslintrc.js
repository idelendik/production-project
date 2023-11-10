module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:i18next/recommended",
        "plugin:storybook/recommended",
        "plugin:storybook/recommended",
    ],
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [{
        env: {
            node: true
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
            sourceType: "script"
        }
    }],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "i18next",
        "react-hooks",
        "idelendik-eslint"
    ],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        // "semi": [
        //     "error",
        //     "always"d
        // ],
        "no-trailing-spaces": ["error"],
        "object-curly-spacing": ["error", "always"],
        "no-multi-spaces": ["error"],
        "react/react-in-jsx-scope": "off",
        "i18next/no-literal-string": ["error", {
            markupOnly: true,
            ignoreAttribute: ["data-testid"]
        }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "idelendik-eslint/fsd-imports-checker": "error",
    }
};