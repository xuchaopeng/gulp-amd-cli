(function () {
  require.config({
    baseUrl: './static/js',
    paths: {
      index: 'page/index.min',
      common:'page/common.min',
      juicer: 'plugin/juicer'
    }
  })
})();