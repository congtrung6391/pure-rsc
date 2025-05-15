'use strict';

const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  plugins: ['@babel/transform-modules-commonjs'],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const express = require('express');
const compress = require('compression');
const {readFileSync} = require('fs');
const {unlink, writeFile} = require('fs').promises;
const {renderToPipeableStream} = require('react-server-dom-webpack/server');
const path = require('path');
const React = require('react');
const ReactApp = require('../App').default;

const manifest = readFileSync(
  path.resolve(__dirname, '../../dist/react-client-manifest.json'),
  'utf8'
);
const moduleMap = JSON.parse(manifest);
const app = express();
const renderReactNode = (res, Comp, props) => {
    const { pipe } = renderToPipeableStream(React.createElement(Comp, props), moduleMap);
    pipe(res);
};

app.get('/', (_, res) => {
    const html = readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf8');
    res.send(html);
});
app.get('/rsc', async (req, res) => {
    const path = req.query.location;
    renderReactNode(res, ReactApp, { pathname: path || '/' });
});

app.use(express.static('dist'));
app.use(express.static('public'));
app.listen(3000);
