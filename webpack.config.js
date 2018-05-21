const path = require("path");

module.exports = {
  entry: {
    "arrival-date": "./src/per-question/arrival-date.js",
    lunch: "./src/per-question/lunch.js",
    "graduate-paperwork-check-ins":
      "./src/per-question/graduate-paperwork-check-ins.js",
    "graduate-immigration-regulations-sessions":
      "./src/per-question/graduate-immigration-regulations-sessions.js",
    "graduate-mandatory-sessions":
      "./src/per-question/graduate-mandatory-sessions.js",
    "undergraduate-paperwork-check-ins":
      "./src/per-question/undergraduate-paperwork-check-ins.js",
    "latecomer-paperwork-check-ins":
      "./src/per-question/latecomer-paperwork-check-ins.js",
    "undergraduate-immigration-regulations-sessions":
      "./src/per-question/undergraduate-immigration-regulations-sessions.js",
    "undergraduate-mandatory-sessions":
      "./src/per-question/undergraduate-mandatory-sessions.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/")
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")]
  }
};
