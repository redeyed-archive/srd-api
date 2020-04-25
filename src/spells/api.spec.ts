import SpellAPI, { Query } from './api';
import { SpellcasterClass, School } from '../models/Spell';

describe('spells.api.get', () => {

    const tests: {
        name: string,
        input: string,
        expected: {
            name: string;
            found: boolean;
        }
    }[] = [
            {
                name: 'Fireball, case sensitive',
                input: 'Fireball',
                expected: {
                    name: 'Fireball',
                    found: true,
                }
            },
            {
                name: 'Fireball, case insensitive',
                input: 'fireball',
                expected: {
                    name: 'Fireball',
                    found: true,
                }
            }
        ];

    const spellAPI = new SpellAPI();

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = spellAPI.get(test.input);
            if (test.expected.found) {
                expect(actual === undefined).toEqual(false);
                if (actual !== undefined) {
                    expect(actual.name).toEqual(test.expected.name);
                }
            } else {
                expect(actual).toBeUndefined();
            }
            done();
        })
    });
});

describe('spells.api.query', () => {

    const tests: {
        name: string,
        query: Query,
        expected: {
            results: number;
        }
    }[] = [
            {
                name: 'list all cantrips',
                query: {
                    levels: [0],
                },
                expected: {
                    results: 24,
                }
            },
            {
                name: 'list wizard spells',
                query: {
                    classes: [
                        SpellcasterClass.Wizard,
                    ]
                },
                expected: {
                    results: 189,
                }
            },
            {
                name: 'list evocation spells',
                query: {
                    schools: [
                        School.Evocation,
                    ]
                },
                expected: {
                    results: 57,
                }
            },
            {
                name: 'list wizard cantrips',
                query: {
                    classes: [
                        SpellcasterClass.Wizard,
                    ],
                    levels: [
                        0,
                    ],
                },
                expected: {
                    results: 14,
                }
            },
            {
                name: 'list wizard evocation cantrips',
                query: {
                    classes: [
                        SpellcasterClass.Wizard,
                    ],
                    levels: [
                        0,
                    ],
                    schools: [
                        School.Evocation,
                    ]
                },
                expected: {
                    results: 5,
                }
            },
            {
                name: 'list all 1st and 2nd level spells',
                query: {
                    levels: [1, 2],
                },
                expected: {
                    results: 99,
                }
            },
            {
                name: 'fire spell book',
                query: {
                    name: 'fire'
                },
                expected: {
                    results: 7,
                }
            },
            {
                name: 'fire cantrips',
                query: {
                    name: 'fire',
                    levels: [0],
                },
                expected: {
                    results: 1,
                }
            }
        ];

    const spellAPI = new SpellAPI();

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = spellAPI.query(test.query);
            expect(actual.length).toEqual(test.expected.results);
            actual.forEach((spell) => {
                if (test.query.name !== undefined && test.query.name !== '') {
                    expect(spell.name.toLowerCase()).toContain(test.query.name.toLowerCase());
                }
                if (test.query.classes !== undefined && test.query.classes.length > 0) {
                    const filteredList = test.query.classes.filter((value) => spell.classes.includes(value));
                    expect(filteredList.length).toBeGreaterThan(0);
                }
                if (test.query.levels !== undefined && test.query.levels.length > 0) {
                    expect(test.query.levels).toContain(spell.level);
                }
                if (test.query.schools !== undefined && test.query.schools.length > 0) {
                    expect(test.query.schools).toContain(spell.school);
                }
            });
            done();
        })
    });
});
