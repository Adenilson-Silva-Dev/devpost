import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import'; // 👈 Adicionado
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
      prettier: pluginPrettier,
      import: pluginImport, // 👈 Adicionado
    },
    rules: {
      // Regras React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],

      // Regras gerais
      'no-use-before-define': ['error', { variables: false }],
      'no-unused-vars': 'error',

      // Regras de importação (remove imports não usados)
      'import/no-unused-modules': ['warn', { unusedExports: true }],

      // Regras React Native
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'off',

      // Regras do Prettier
      'prettier/prettier': 'warn',
    },
  },
]);
