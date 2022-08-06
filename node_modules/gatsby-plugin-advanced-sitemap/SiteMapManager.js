"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _IndexMapGenerator = _interopRequireDefault(require("./IndexMapGenerator"));

var _SiteMapGenerator = _interopRequireDefault(require("./SiteMapGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var SiteMapManager = /*#__PURE__*/function () {
  function SiteMapManager(options) {
    var _this = this;

    var sitemapTypes = [];
    options = options || {};
    this.options = options;

    for (var type in options.mapping) {
      var sitemapType = options.mapping[type].sitemap || "pages";
      sitemapTypes.push(sitemapType);
    } // ensure, we have a cleaned up array


    sitemapTypes = _lodash.default.uniq(sitemapTypes); // create sitemaps for each type

    sitemapTypes.forEach(function (type) {
      _this[type] = options[type] || _this.createSiteMapGenerator(options, type);
    });
    this.index = options.index || this.createIndexGenerator(sitemapTypes); // create the default pages one for all fallback sitemap URLs

    this.pages = options.pages || this.createSiteMapGenerator(options, "pages");
  }

  var _proto = SiteMapManager.prototype;

  _proto.createIndexGenerator = function createIndexGenerator(sitemapTypes) {
    var _this2 = this;

    var types = {};
    sitemapTypes.forEach(function (type) {
      return types[type] = _this2[type];
    });
    return new _IndexMapGenerator.default({
      types: types
    });
  };

  _proto.createSiteMapGenerator = function createSiteMapGenerator(options, type) {
    return new _SiteMapGenerator.default(options, type);
  };

  _proto.getIndexXml = function getIndexXml(options) {
    return this.index.getXml(options);
  };

  _proto.getSiteMapXml = function getSiteMapXml(type, options) {
    return this[type].getXml(options);
  } // This is the equivalent of adding the URLs on bootstrap by listening to the events
  // like we do in Ghost core
  ;

  _proto.addUrls = function addUrls(type, _ref) {
    var url = _ref.url,
        node = _ref.node;
    return this[type].addUrl(url, node);
  };

  return SiteMapManager;
}();

exports.default = SiteMapManager;