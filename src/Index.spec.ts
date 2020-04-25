import srdAPI from './Index';

describe('spells', () => {
    it(('list'), (done) => {
        const spellList = srdAPI.spells.list();
        expect(spellList === undefined).toEqual(false);
        expect(spellList.length).toEqual(304);
        done();
    });
});
