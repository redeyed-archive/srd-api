
import * as io_ts from 'io-ts';
import { optional, descriptionInterface, sizeUnion, movementInterface } from '../../lib/test';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import RaceAPI, { Query } from './RaceAPI';
import races from '../../public/races.json';
import Race from '../models/Race';

describe('races.get', () => {

    const tests: {
        name: string;
        input: string;
        expected: {
            found: boolean;
            name: string;
        }
    }[] = [
            {
                name: 'Human',
                input: 'Human',
                expected: {
                    found: true,
                    name: 'Human'
                }
            },
            {
                name: 'Human, wrong case',
                input: 'HUMAN',
                expected: {
                    found: true,
                    name: 'Human'
                }
            }
        ];

    const api = new RaceAPI(races as Race[]);

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = api.get(test.input);
            if (test.expected.found) {
                expect(actual).toBeDefined();
            } else {
                expect(actual).toBeUndefined();
            }
            if (actual !== undefined) {
                expect(actual.name).toEqual(test.expected.name);
            }
            done();
        });
    });
});

describe('races.list', () => {
    const api = new RaceAPI(races as Race[]);
    it('count', (done) => {
        const list = api.list();
        expect(list).toBeDefined();
        expect(list).toHaveLength(9);
        done();
    });
});

describe('races.query', () => {

    const tests: {
        name: string;
        input: Query;
        expected: {
            count: number;
            names: string[];
        }
    }[] = [
            {
                name: 'half',
                input: {
                    name: 'half'
                },
                expected: {
                    count: 3,
                    names: [
                        'Halfling',
                        'Half-Elf',
                        'Half-Orc',
                    ]
                }
            }, {
                name: 'elves',
                input: {
                    name: 'elf'
                },
                expected: {
                    count: 2,
                    names: [
                        'Elf',
                        'Half-Elf',
                    ]
                }
            }
        ];

    const api = new RaceAPI(races as Race[]);

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = api.query(test.input);
            expect(actual).toBeDefined();
            expect(actual).toHaveLength(test.expected.count);

            const actualNames = actual.map((item) => item.name);
            expect(actualNames).toStrictEqual(test.expected.names);

            done();
        });
    });
});

describe('validate', () => {

    const traitUnion = io_ts.interface({
        name: io_ts.string,
        description: io_ts.array(descriptionInterface),
    });

    const subraceInterface = io_ts.interface({
        name: io_ts.string,
        description: optional(io_ts.array(descriptionInterface)),
        size: optional(sizeUnion),
        speed: optional(movementInterface),
        languages: optional(io_ts.array(io_ts.string)),
        traits: io_ts.array(traitUnion),
    });

    const raceInterface = io_ts.interface({
        name: io_ts.string,
        description: optional(io_ts.array(descriptionInterface)),
        size: sizeUnion,
        speed: movementInterface,
        languages: io_ts.array(io_ts.string),
        traits: io_ts.array(traitUnion),
        subraces: optional(io_ts.array(subraceInterface)),
    });


    (races as Race[]).forEach((item) => {
        it(item.name, (done) => {
            const result = raceInterface.decode(item);
            ThrowReporter.report(result);
            done();
        });
    })

});