import SpellAPI, { Query } from './api';
import { School, Area } from '../models/Spell';
import { ClassType } from '../shared/Classes';
import * as io_ts from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { optional } from '../../lib/test';
import { AttackType } from '../shared/Attacks';
import { Ability } from '../shared/Abilities';

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
            },
            {
                name: 'ranged attacks',
                query: {
                    attackTypes: [
                        AttackType.Ranged,
                    ],
                },
                expected: {
                    results: 8,
                }
            },
            {
                name: 'melee attacks',
                query: {
                    attackTypes: [
                        AttackType.Melee,
                    ],
                },
                expected: {
                    results: 8,
                }
            },
            {
                name: 'ranged and melee attacks',
                query: {
                    attackTypes: [
                        AttackType.Ranged,
                        AttackType.Melee,
                    ],
                },
                expected: {
                    results: 16,
                }
            },
            {
                name: 'dex saves',
                query: {
                    saveTypes: [
                        Ability.Dexterity,
                    ],
                },
                expected: {
                    results: 27,
                }
            },
            {
                name: 'con saves',
                query: {
                    saveTypes: [
                        Ability.Constitution,
                    ],
                },
                expected: {
                    results: 21,
                }
            },
            {
                name: 'dex and con saves',
                query: {
                    saveTypes: [
                        Ability.Constitution,
                        Ability.Dexterity,
                    ],
                },
                expected: {
                    results: 48,
                }
            },
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

    const spellInterface = io_ts.interface({
        name: io_ts.string,
        level: io_ts.number,
        school: io_ts.union([
            io_ts.literal('abjuration'),
            io_ts.literal('conjuration'),
            io_ts.literal('divination'),
            io_ts.literal('enchantment'),
            io_ts.literal('evocation'),
            io_ts.literal('illusion'),
            io_ts.literal('necromancy'),
            io_ts.literal('transmutation'),
        ]),
        casting_time: io_ts.union([
            io_ts.literal('reaction'),
            io_ts.literal('bonus action'),
            io_ts.literal('action'),
            io_ts.literal('1 minute'),
            io_ts.literal('10 minutes'),
            io_ts.literal('1 hour'),
            io_ts.literal('8 hours'),
            io_ts.literal('12 hours'),
            io_ts.literal('24 hours'),
        ]),
        duration: io_ts.union([
            io_ts.literal('instantaneous'),
            io_ts.literal('1 round'),
            io_ts.literal('1 minute'),
            io_ts.literal('10 minutes'),
            io_ts.literal('1 hour'),
            io_ts.literal('2 hours'),
            io_ts.literal('8 hours'),
            io_ts.literal('12 hours'),
            io_ts.literal('24 hours'),
            io_ts.literal('1 day'),
            io_ts.literal('7 days'),
            io_ts.literal('10 days'),
            io_ts.literal('30 days'),
            io_ts.literal('special'),
            io_ts.literal('until dispelled'),
        ]),
        range: io_ts.union([
            io_ts.literal('self'),
            io_ts.literal('touch'),
            io_ts.literal('sight'),
            io_ts.literal('5 feet'),
            io_ts.literal('10 feet'),
            io_ts.literal('30 feet'),
            io_ts.literal('60 feet'),
            io_ts.literal('90 feet'),
            io_ts.literal('100 feet'),
            io_ts.literal('120 feet'),
            io_ts.literal('150 feet'),
            io_ts.literal('300 feet'),
            io_ts.literal('500 feet'),
            io_ts.literal('1 mile'),
            io_ts.literal('500 miles'),
            io_ts.literal('special'),
            io_ts.literal('unlimited'),
        ]),
        area: optional(io_ts.interface({
            shape: io_ts.union([
                io_ts.literal('cone'),
                io_ts.literal('cube'),
                io_ts.literal('cylinder'),
                io_ts.literal('line'),
                io_ts.literal('sphere'),
            ]),
            size: io_ts.number,
            unit: io_ts.union([
                io_ts.literal('feet'),
                io_ts.literal('miles'),
            ]),
        })),
        components: io_ts.any,
        description: io_ts.array(io_ts.string),
        higher_levels: optional(io_ts.array(io_ts.string)),
        ritual: io_ts.boolean,
        attack: optional(io_ts.union([
            io_ts.literal('melee'),
            io_ts.literal('ranged'),
        ])),
        save: optional(io_ts.union([
            io_ts.literal('strength'),
            io_ts.literal('dexterity'),
            io_ts.literal('constitution'),
            io_ts.literal('intelligence'),
            io_ts.literal('wisdom'),
            io_ts.literal('charisma'),
        ])),
        concentration: io_ts.boolean,
        reaction_trigger: optional(io_ts.string),
        classes: io_ts.array(io_ts.union([
            io_ts.literal('bard'),
            io_ts.literal('cleric'),
            io_ts.literal('druid'),
            io_ts.literal('paladin'),
            io_ts.literal('ranger'),
            io_ts.literal('sorcerer'),
            io_ts.literal('warlock'),
            io_ts.literal('wizard'),
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
