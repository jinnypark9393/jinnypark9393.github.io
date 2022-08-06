import SiteMapIndexGenerator from '../IndexMapGenerator';

import defaultOptions from '../defaults';

// TODO
describe(`It generates Index Sitemap`, () => {
    it(`Should get xml`, () => {
        const generator = new SiteMapIndexGenerator(defaultOptions);

        const xml = generator.getXml(defaultOptions);

        expect(xml).toMatchSnapshot();
    });
});
