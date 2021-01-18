module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/no-unresolved',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@actions': './src/actions',
          '@components': './src/components',
          '@constants': './src/constants',
          '@images': './src/images',
          '@metrics': './src/metrics',
          '@navigators': './src/navigators',
          '@reducers': './src/reducers',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@styles': './src/styles',
          '@theme': './src/theme',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    },
  },
};
