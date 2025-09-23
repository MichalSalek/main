import {defineConfig} from 'eslint/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    {
        extends: compat.extends('next', 'next/core-web-vitals', 'prettier'),
        rules: {
            ...pluginNext.configs.recommended.rules,
            semi: ['off', 'always'],
            quotes: ['error', 'single']
        },
        files: ['**/*.ts', '**/*.tsx'],
    }
])
