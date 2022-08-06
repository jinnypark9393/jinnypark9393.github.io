import * as utils from '../utils';

describe(`It should test utils`, () => {
    it(`should match the getDeclarations snapshot`, () => {
        expect(utils.sitemapsUtils.getDeclarations()).toMatchSnapshot();
    });
});