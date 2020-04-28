import srdAPI from './Index';

describe('spells', () => {
    it('list', (done) => {
        const spellList = srdAPI.spells.list();
        expect(spellList).toBeDefined()
        expect(spellList.length).toEqual(304);
        done();
    });
});

describe('conditions', () => {
    it('list', (done) => {
        const conditionList = srdAPI.conditions.list();
        expect(conditionList).toBeDefined()
        expect(conditionList.length).toEqual(15);
        done();
    });
})
