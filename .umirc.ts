import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/detail', component: '@/pages/detail' },
  ],
  // extraPostCSSPlugins: [
  //   require('postcss-flexbugs-fixes'),
  //   require('postcss-px-to-viewport')({
  //     unitToConvert: "px",
  //     viewportWidth: 1920,
  //     unitPrecision: 3,
  //     viewportUnit: 'vw',
  //     selectorBlackList: [],
  //     minPixelValue: 1,
  //     mediaQuery: false,
  //   }),
  // ],
});
