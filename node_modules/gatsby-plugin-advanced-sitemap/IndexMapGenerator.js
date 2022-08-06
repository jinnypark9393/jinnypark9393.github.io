"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _xml = _interopRequireDefault(require("xml"));

var _moment = _interopRequireDefault(require("moment"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var XMLNS_DECLS = {
  _attr: {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
  }
};

var SiteMapIndexGenerator = /*#__PURE__*/function () {
  function SiteMapIndexGenerator(options) {
    options = options || {};
    this.types = options.types;
  }

  var _proto = SiteMapIndexGenerator.prototype;

  _proto.getXml = function getXml(options) {
    var urlElements = this.generateSiteMapUrlElements(options);
    var data = {
      // Concat the elements to the _attr declaration
      sitemapindex: [XMLNS_DECLS].concat(urlElements)
    }; // Return the xml

    return utils.sitemapsUtils.getDeclarations(options) + (0, _xml.default)(data);
  };

  _proto.generateSiteMapUrlElements = function generateSiteMapUrlElements(_ref) {
    var _this = this;

    var sources = _ref.sources,
        siteUrl = _ref.siteUrl,
        pathPrefix = _ref.pathPrefix,
        resourcesOutput = _ref.resourcesOutput;
    return _lodash.default.map(sources, function (source) {
      var filePath = resourcesOutput.replace(/:resource/, source.name).replace(/^\//, "");
      var siteMapUrl = source.url ? source.url : _url.default.resolve(siteUrl, _path.default.join(pathPrefix, filePath));
      var lastModified = source.url ? (0, _moment.default)(new Date(), _moment.default.ISO_8601).toISOString() : _this.types[source.sitemap].lastModified || (0, _moment.default)(new Date(), _moment.default.ISO_8601).toISOString();
      return {
        sitemap: [{
          loc: siteMapUrl
        }, {
          lastmod: (0, _moment.default)(lastModified).toISOString()
        }]
      };
    });
  };

  return SiteMapIndexGenerator;
}();

exports.default = SiteMapIndexGenerator;