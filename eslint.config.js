import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	// JavaScript recommended rules
	js.configs.recommended,

	// TypeScript recommended rules
	ts.configs.recommended,

	// Svelte recommended rules
	...svelte.configs['flat/recommended'],

	// Prettier rules (ensure this comes last to avoid conflicts)
	prettier,

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: tsParser // Use TypeScript parser
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tsParser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
];
