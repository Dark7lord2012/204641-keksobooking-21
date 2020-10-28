const path = require("path");

module.exports = {
  entry: [
    "./js/network.js",
    "./js/filter.js",
    "./js/data.js",
    "./js/map.js",
    "./js/card.js",
    "./js/debounce.js",
    "./js/pin.js",
    "./js/filter-form.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname/js),
    iife: true
  },
  devtool: false
};
