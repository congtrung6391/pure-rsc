import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';

import ReactApp from '../src/App';
import { createElement } from 'react';

const app = express();

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream( createElement(ReactApp), {
    bootstrapScripts: ['/src/index.tsx']
    });
  pipe(res);
});

app.listen(3000);
