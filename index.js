'use strict';

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'Using `babel-preset-kkt` requires that you specify `NODE_ENV` or ' +
    '`BABEL_ENV` environment variables. Valid values are "development", ' +
    '"test", and "production". Instead, received: ' +
    JSON.stringify(env) +
    '.'
  );
}

var preset = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          browsers: [
            'last 2 versions',
            'ie >= 10',
          ],
        },
      },
    ],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-transform-async-to-generator'),
    [
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      {
        loose: true,
        useBuiltIns: true,
      },
    ],
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    [
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
          },
        },
      },
    ],
  ],
}

if (env === 'development') {
  preset.plugins.push.apply(preset.plugins, [
    // Adds component stack to warning messages
    require.resolve('@babel/plugin-transform-react-jsx-source'),
  ]);
}

if (env === 'production') {
  preset.plugins.push.apply(preset.plugins, [
    require.resolve('babel-plugin-transform-react-remove-prop-types'),
  ]);
}

module.exports = () => preset;