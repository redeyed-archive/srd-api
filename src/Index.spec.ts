import srdAPI from './Index';

describe('conditions', () => {
    it('list', (done) => {
        const list = srdAPI.conditions.list();
        expect(list).toBeDefined()
        expect(list.length).toEqual(15);
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

describe('races', () => {
    it('list', (done) => {
        const list = srdAPI.races.list();
        expect(list).toBeDefined()
        expect(list.length).toEqual(9);
        done();
    });
});

describe('spells', () => {
    it('list', (done) => {
        const list = srdAPI.spells.list();
        expect(list).toBeDefined()
        expect(list.length).toEqual(304);
        done();
    });
});
