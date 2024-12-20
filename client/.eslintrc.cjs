module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true, // Added JSX support
        },
    },
    plugins: ["react", "react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        indent: ["error", 4], // If you prefer 4 spaces, keep it as is
        // 'quotes': ['error', 'single'],  // Enforce single quotes
        // semi: ["error", "never"], // Ensure semicolons are used
        "@typescript-eslint/explicit-module-boundary-types": "off", // Optional: Disable explicit types for module boundaries if preferred
        "@typescript-eslint/no-explicit-any": "warn", // Optional: Warn when using 'any' type
    },
};
