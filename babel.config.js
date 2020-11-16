const isProd = process.env.NODE_ENV === 'production'
const plugins = []
if (isProd) {
  plugins.push(["transform-remove-console"])
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ...plugins,
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: 'css'
      }
    ]
  ]
}
