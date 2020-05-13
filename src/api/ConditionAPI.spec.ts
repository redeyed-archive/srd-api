import ConditionAPI from './ConditionAPI';
import conditionData from '../../public/conditions.json'
import Condition from '../models/Condition';
import * as io_ts from 'io-ts';
import { optional, descriptionInterface } from '../../lib/test';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

describe('conditions.get', () => {

    const conditions = new ConditionAPI(conditionData as Condition[]);

    const tests: {
        name: string,
        conditionType: string,
        expected: {
            found: boolean;
            linkedConditions?: string[];
        }
    }[] = [
            {
                name: 'Blinded',
                conditionType: 'Blinded',
                expected: {
                    found: true,
                }
            },
            {
                name: 'Blinded, lowercase',
                conditionType: 'blinded',
                expected: {
                    found: true,
                }
            },
            {
                name: 'Grappled',
                conditionType: 'Grappled',
                expected: {
                    found: true,
                    linkedConditions: [
                        'Incapacitated',
                    ]
                }
            },
            {
                name: 'Paralyzed',
                conditionType: 'Paralyzed',
                expected: {
                    found: true,
                    linkedConditions: [
                        'Incapacitated',
                    ]
                }
            },
            {
                name: 'Petrified',
                conditionType: 'Petrified',
                expected: {
                    found: true,
                    linkedConditions: [
                        'Incapacitated',
                    ]
                }
            },
            {
                name: 'Stunned',
                conditionType: 'Stunned',
                expected: {
                    found: true,
                    linkedConditions: [
                        'Incapacitated',
                    ]
                }
            },
            {
                name: 'Unconscious',
                conditionType: 'Unconscious',
                expected: {
                    found: true,
                    linkedConditions: [
                        'Incapacitated',
                        'Prone',
                    ]
                }
            }
        ];

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = conditions.get(test.conditionType);
            if (test.expected.found) {
                expect(actual).toBeDefined();
                if (actual !== undefined) {
                    expect(actual.linkedConditions).toEqual(test.expected.linkedConditions);
                }
            } else {
                expect(actual).toBeUndefined();
            }
            done();
        });
    });
});

describe('conditions.list', () => {

    it('count', () => {
        const conditions = new ConditionAPI(conditionData as Condition[]);

        const actual = conditions.list();

        expect(actual).toBeDefined();
        expect(actual).toHaveLength(15);
    })

});

describe('validate', () => {

    const objectInterface = io_ts.interface({
        name: io_ts.string,
        description: io_ts.array(descriptionInterface),
        linkedConditions: optional(io_ts.array(io_ts.string)),
    });

    (conditionData as Condition[]).forEach((condition) => {
        it(condition.name, (done) => {
            const result = objectInterface.decode(condition);
            ThrowReporter.report(result);
            done();
        });
    })

});
