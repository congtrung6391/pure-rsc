import { readFileSync } from 'fs';
import path from 'path';
import express, { Response } from 'express';
import * as React from 'react';
import { renderToPipeableStream } from 'react-server-dom-webpack/server';
import reactServerRegister from 'react-server-dom-webpack/node-register';

import ReactApp from '../App';

reactServerRegister();

const manifest = readFileSync(
  path.resolve('./dist/react-client-manifest.json'),
  'utf8',
);
const moduleMap = JSON.parse(manifest);

const app = express();

const renderReactNode = (res: Response, Comp: any, props?: Record<string, unknown>) => {
  const { pipe } = renderToPipeableStream(
    React.createElement(Comp, props),
    moduleMap,
  );
  pipe(res);
};

app.get('/', (_, res) => {
  const html = readFileSync(path.resolve('./dist/index.html'), 'utf8');

  res.send(html);
});

app.get('/list', (_, res) => {
  const { pipe } = renderToPipeableStream(
    React.createElement(ReactApp),
    moduleMap,
  );
  pipe(res);
});

app.get('/rsc', (req, res) => {
  const path = req.query.path;

  if (!path || path === '/') {
    renderReactNode(res, ReactApp);
  }
})

app.use(express.static('dist'));
app.use(express.static('public'));

app.listen(3000);
