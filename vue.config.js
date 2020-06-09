module.exports = {
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      }
    },
    css: { extract: false } //强制内联
  }