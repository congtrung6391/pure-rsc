import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  output: {
    sourceMap: {
      js: 'inline-source-map',
      css: true,
    },
  },
  plugins: [pluginReact()],
});
