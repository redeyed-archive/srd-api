import SpellAPI, { Query } from './api';
import { School, Area } from '../models/Spell';
import { ClassType } from '../shared/Classes';
import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { optional } from '../../lib/test';

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
                expect(actual).toBeDefined();
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

describe('spells.api.list', () => {

    const spellAPI = new SpellAPI();

    const spellList = spellAPI.list();

    expect(spellList).toBeDefined();
    expect(spellList.length).toEqual(304);
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
                        ClassType.Wizard,
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
                        ClassType.Wizard,
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
                        ClassType.Wizard,
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

describe('validation', () => {

    const spellInterface = t.interface({
        name: t.string,
        level: t.number,
        school: t.union([
            t.literal('abjuration'),
            t.literal('conjuration'),
            t.literal('divination'),
            t.literal('enchantment'),
            t.literal('evocation'),
            t.literal('illusion'),
            t.literal('necromancy'),
            t.literal('transmutation'),
        ]),
        casting_time: t.union([
            t.literal('reaction'),
            t.literal('bonus action'),
            t.literal('action'),
            t.literal('1 minute'),
            t.literal('10 minutes'),
            t.literal('1 hour'),
            t.literal('8 hours'),
            t.literal('12 hours'),
            t.literal('24 hours'),
        ]),
        duration: t.union([
            t.literal('instantaneous'),
            t.literal('1 round'),
            t.literal('1 minute'),
            t.literal('10 minutes'),
            t.literal('1 hour'),
            t.literal('2 hours'),
            t.literal('8 hours'),
            t.literal('12 hours'),
            t.literal('24 hours'),
            t.literal('1 day'),
            t.literal('7 days'),
            t.literal('10 days'),
            t.literal('30 days'),
            t.literal('special'),
            t.literal('until dispelled'),
        ]),
        range: t.union([
            t.literal('self'),
            t.literal('touch'),
            t.literal('sight'),
            t.literal('5 feet'),
            t.literal('10 feet'),
            t.literal('30 feet'),
            t.literal('60 feet'),
            t.literal('90 feet'),
            t.literal('100 feet'),
            t.literal('120 feet'),
            t.literal('150 feet'),
            t.literal('300 feet'),
            t.literal('500 feet'),
            t.literal('1 mile'),
            t.literal('500 miles'),
            t.literal('special'),
            t.literal('unlimited'),
        ]),
        area: optional(t.union([
            t.literal('10-foot radius'),
            t.literal('15-foot radius'),
            t.literal('30-foot radius'),
            t.literal('5-mile radius'),
            t.literal('15-foot cone'),
            t.literal('30-foot cone'),
            t.literal('60-foot cone'),
            t.literal('15-foot cube'),
            t.literal('60-foot line'),
            t.literal('100-foot line'),
        ])),
        components: t.any,
        description: t.array(t.string),
        higher_levels: optional(t.array(t.string)),
        ritual: optional(t.boolean),
        attack: optional(t.union([
            t.literal('melee'),
            t.literal('ranged'),
        ])),
        save: optional(t.union([
            t.literal('strength'),
            t.literal('dexterity'),
            t.literal('constitution'),
            t.literal('intelligence'),
            t.literal('wisdom'),
            t.literal('charisma'),
        ])),
        concentration: optional(t.boolean),
        reaction_trigger: optional(t.string),
        classes: t.array(t.union([
            t.literal('bard'),
            t.literal('cleric'),
            t.literal('druid'),
            t.literal('paladin'),
            t.literal('ranger'),
            t.literal('sorcerer'),
            t.literal('warlock'),
            t.literal('wizard'),
        ])),
    });

    const spellAPI = new SpellAPI();
    const spellList = spellAPI.list();

    spellList.forEach((spell) => {
        it(spell.name, (done) => {
            const result = spellInterface.decode(spell);
            ThrowReporter.report(result);
            done();
        });
    })
});
