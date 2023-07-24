module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('react-native-paper/babel'),
      require.resolve('expo-router/babel'),
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: './',
          rootPathPrefix: '@/',
        },
      ],
    ],
  };
};
