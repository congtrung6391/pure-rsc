module.exports = {
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  plugins: ['@babel/transform-modules-commonjs'],
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        useSpread: true,
        development: true,
      },
    ],
  ],
};

