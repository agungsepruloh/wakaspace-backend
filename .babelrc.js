module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-transform-export-extensions'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        extensions: ['.js'],
        alias: {
          '@wakaspace/config': './src/config/index',
          '@wakaspace/models': './src/models/index',
          '@wakaspace/services/admin': './src/services/admin/index',
          '@wakaspace/services': './src/services/index',
          '@wakaspace/constants': './src/lib/constants/index',
          '@wakaspace/moment': './src/lib/utils/moment',
          '@wakaspace/exception': './src/lib/exceptions/wakaspaceError',
          '@wakaspace/plugins': './src/lib/plugins/index',
          '@wakaspace/validators': './src/lib/validators/index',
          '@wakaspace/core': './src/lib/core/index',
          '@wakaspace/passport': './src/lib/utils/passport-strategy/index',
          '@wakaspace/utils': './src/lib/utils/index',
          '@wakaspace/logger': './src/loaders/logger',
          '@wakaspace/middlewares': './src/api/middlewares',
          '^@wakaspace/modules/(.+)': ([, name]) => `./src/lib/modules/${name}`,
        },
      },
    ],
  ],
};
