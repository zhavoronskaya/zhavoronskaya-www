const babelConfig = {
  presets: ["next/babel"],

  plugins: [
    [
      "babel-plugin-inline-import",
      {
        extensions: [".html", ".glsl"],
      },
    ],
  ],
};

module.exports = babelConfig;
