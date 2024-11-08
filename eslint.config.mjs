import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [{
    files: ["**/*.ts"],
    ignores: [
        "**/out",
        "**/*.d.ts",
        "**/.vscode/",
        "**/compodoc/",
        "**/coverage/",
        "**/docs/",
        "**/node_modules/",
        "**/out/",
        "**/tests/",
        "**/commitlint.config.js",
        "**/eslint.config.mjs",
    ],
}, {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/naming-convention": "warn",
        curly: "warn",
        eqeqeq: "warn",
        "no-throw-literal": "warn",
        semi: "off",
    },
}];