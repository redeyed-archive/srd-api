import SpellAPI, { Query } from './api';
import { School, Area } from '../models/Spell';
import { ClassType } from '../shared/Classes';
import * as iots from 'io-ts';
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

    const spellInterface = iots.interface({
        name: iots.string,
        level: iots.number,
        school: iots.union([
            iots.literal('abjuration'),
            iots.literal('conjuration'),
            iots.literal('divination'),
            iots.literal('enchantment'),
            iots.literal('evocation'),
            iots.literal('illusion'),
            iots.literal('necromancy'),
            iots.literal('transmutation'),
        ]),
        casting_time: iots.union([
            iots.literal('reaction'),
            iots.literal('bonus action'),
            iots.literal('action'),
            iots.literal('1 minute'),
            iots.literal('10 minutes'),
            iots.literal('1 hour'),
            iots.literal('8 hours'),
            iots.literal('12 hours'),
            iots.literal('24 hours'),
        ]),
        duration: iots.union([
            iots.literal('instantaneous'),
            iots.literal('1 round'),
            iots.literal('1 minute'),
            iots.literal('10 minutes'),
            iots.literal('1 hour'),
            iots.literal('2 hours'),
            iots.literal('8 hours'),
            iots.literal('12 hours'),
            iots.literal('24 hours'),
            iots.literal('1 day'),
            iots.literal('7 days'),
            iots.literal('10 days'),
            iots.literal('30 days'),
            iots.literal('special'),
            iots.literal('until dispelled'),
        ]),
        range: iots.union([
            iots.literal('self'),
            iots.literal('touch'),
            iots.literal('sight'),
            iots.literal('5 feet'),
            iots.literal('10 feet'),
            iots.literal('30 feet'),
            iots.literal('60 feet'),
            iots.literal('90 feet'),
            iots.literal('100 feet'),
            iots.literal('120 feet'),
            iots.literal('150 feet'),
            iots.literal('300 feet'),
            iots.literal('500 feet'),
            iots.literal('1 mile'),
            iots.literal('500 miles'),
            iots.literal('special'),
            iots.literal('unlimited'),
        ]),
        area: optional(iots.union([
            iots.literal('10-foot radius'),
            iots.literal('15-foot radius'),
            iots.literal('30-foot radius'),
            iots.literal('5-mile radius'),
            iots.literal('15-foot cone'),
            iots.literal('30-foot cone'),
            iots.literal('60-foot cone'),
            iots.literal('15-foot cube'),
            iots.literal('60-foot line'),
            iots.literal('100-foot line'),
        ])),
        components: iots.any,
        description: iots.array(iots.string),
        higher_levels: optional(iots.array(iots.string)),
        ritual: iots.boolean,
        attack: optional(iots.union([
            iots.literal('melee'),
            iots.literal('ranged'),
        ])),
        save: optional(iots.union([
            iots.literal('strength'),
            iots.literal('dexterity'),
            iots.literal('constitution'),
            iots.literal('intelligence'),
            iots.literal('wisdom'),
            iots.literal('charisma'),
        ])),
        concentration: iots.boolean,
        reaction_trigger: optional(iots.string),
        classes: iots.array(iots.union([
            iots.literal('bard'),
            iots.literal('cleric'),
            iots.literal('druid'),
            iots.literal('paladin'),
            iots.literal('ranger'),
            iots.literal('sorcerer'),
            iots.literal('warlock'),
            iots.literal('wizard'),
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
