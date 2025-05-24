/**
 * eslint.config.ts
 */

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([]),
	{
        files: ["pg/**/*.ts"],
        ignores: [],
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);