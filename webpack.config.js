const path = require("path");

module.exports = {
  entry: {
    "graduate-academic-success-and-title-ix":
      "./src/per-question/graduate-academic-success-and-title-ix.js",
    "graduate-paperwork-check-ins":
      "./src/per-question/graduate-paperwork-check-ins.js",
    "graduate-immigration-regulations-sessions":
      "./src/per-question/graduate-immigration-regulations-sessions.js",
    "graduate-law-and-safety-and-health-insurance":
      "./src/per-question/graduate-law-and-safety-and-health-insurance.js",
    "undergraduate-paperwork-check-ins":
      "./src/per-question/undergraduate-paperwork-check-ins.js",
    "latecomer-paperwork-check-ins":
      "./src/per-question/latecomer-paperwork-check-ins.js",
    "undergraduate-immigration-regulations-sessions":
      "./src/per-question/undergraduate-immigration-regulations-sessions.js",
    "undergraduate-law-and-safety-and-title-ix-and-health-insurance":
      "./src/per-question/undergraduate-law-and-safety-and-title-ix-and-health-insurance.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/")
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};
