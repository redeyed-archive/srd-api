import srdAPI from './Index';

describe('conditions', () => {
    it('list', (done) => {
        const conditionList = srdAPI.conditions.list();
        expect(conditionList).toBeDefined()
        expect(conditionList.length).toEqual(15);
        done();
    });
});

describe('languages', () => {
    it('list', (done) => {
        const list = srdAPI.languages.list();
        expect(list).toBeDefined()
        expect(list.length).toEqual(16);
        done();
    });
});

describe('spells', () => {
    it('list', (done) => {
        const spellList = srdAPI.spells.list();
        expect(spellList).toBeDefined()
        expect(spellList.length).toEqual(304);
        done();
    });
});
