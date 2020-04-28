import ConditionAPI from './ConditionAPI';
import { ConditionType } from '../models/Conditions';
import * as io_ts from 'io-ts';
import { optional, descriptionInterface, conditionUnion } from '../../lib/test';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

describe('conditions.get', () => {

    const conditions = new ConditionAPI();

    const tests: {
        name: string,
        conditionType: ConditionType,
        expected: {
            found: boolean;
            linkedConditions?: ConditionType[];
        }
    }[] = [
            {
                name: 'Blinded',
                conditionType: ConditionType.Blinded,
                expected: {
                    found: true,
                }
            },
            {
                name: 'Grappled',
                conditionType: ConditionType.Grappled,
                expected: {
                    found: true,
                    linkedConditions: [
                        ConditionType.Incapacitated,
                    ]
                }
            },
            {
                name: 'Paralyzed',
                conditionType: ConditionType.Paralyzed,
                expected: {
                    found: true,
                    linkedConditions: [
                        ConditionType.Incapacitated,
                    ]
                }
            },
            {
                name: 'Petrified',
                conditionType: ConditionType.Petrified,
                expected: {
                    found: true,
                    linkedConditions: [
                        ConditionType.Incapacitated,
                    ]
                }
            },
            {
                name: 'Stunned',
                conditionType: ConditionType.Stunned,
                expected: {
                    found: true,
                    linkedConditions: [
                        ConditionType.Incapacitated,
                    ]
                }
            },
            {
                name: 'Unconscious',
                conditionType: ConditionType.Unconscious,
                expected: {
                    found: true,
                    linkedConditions: [
                        ConditionType.Incapacitated,
                        ConditionType.Prone,
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
        const conditions = new ConditionAPI();

        const actual = conditions.list();

        expect(actual).toBeDefined();
        expect(actual).toHaveLength(15);
    })

});

describe('validate', () => {

    const objectInterface = io_ts.interface({
        name: conditionUnion,
        description: io_ts.array(descriptionInterface),
        linkedConditions: optional(io_ts.array(conditionUnion)),
    });

    const conditionAPI = new ConditionAPI();
    const conditionList = conditionAPI.list();

    conditionList.forEach((condition) => {
        it(condition.name, (done) => {
            const result = objectInterface.decode(condition);
            ThrowReporter.report(result);
            done();
        });
    })

});
