import SiteMapManager from '../SiteMapManager';

import defaultOptions from '../defaults';
// TODO
describe(`It generates Index Sitemap`, () => {
    it(`Should get xml`, () => {
        const manager = new SiteMapManager(defaultOptions);

        const getIndexXML = manager.getIndexXml(defaultOptions);

        const getSitemapXML = manager.getSiteMapXml(`pages`, defaultOptions);

        expect(getIndexXML).toMatchSnapshot();
        expect(getSitemapXML).toMatchSnapshot();
    });
});