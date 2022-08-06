"use strict";

exports.__esModule = true;
exports.default = void 0;
// These are the default options which can be overwritten
// in gatsby-config.js
var defaultOptions = {
  query: "\n    {\n        allSitePage {\n            edges {\n                node {\n                    id\n                    slug: path\n                    url: path\n                }\n            }\n        }\n    }",
  mapping: {
    allSitePage: {
      sitemap: "pages"
    }
  },
  output: "/sitemap.xml",
  exclude: ["/dev-404-page", "/404", "/404.html", "/offline-plugin-app-shell-fallback"],
  createLinkInHead: true
};
var _default = defaultOptions;
exports.default = _default;