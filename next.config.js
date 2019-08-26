const withCss = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withFonts = require("next-fonts");
const withImages = require("next-images");
module.exports = withImages(withCss(withLess(withFonts())));
