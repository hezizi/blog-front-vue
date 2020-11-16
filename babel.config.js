module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["transform-remove-console"],
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
