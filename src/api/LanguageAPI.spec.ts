
import LanguageAPI, { Query } from './LanguageAPI';
import * as io_ts from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { languageUnion } from '../../lib/test';
import Language, { LanguageType, ScriptType } from '../models/Language';

describe('languages.get', () => {

    const tests: {
        name: string,
        input: LanguageType,
        expected: Language,
    }[] = [
            {
                name: 'Abyssal',
                input: LanguageType.Abyssal,
                expected: {
                    name: LanguageType.Abyssal,
                    typicalSpeakers: [
                        'Demons'
                    ],
                    script: ScriptType.Infernal,
                }
            },
            {
                name: 'Deep Speech',
                input: LanguageType.DeepSpeech,
                expected: {
                    name: LanguageType.DeepSpeech,
                    typicalSpeakers: [
                        'Aboleths',
                        'cloakers'
                    ],
                    script: ScriptType.None,
                }
            },
            {
                name: 'Sylvan',
                input: LanguageType.Sylvan,
                expected: {
                    name: LanguageType.Sylvan,
                    typicalSpeakers: [
                        'Fey creatures'
                    ],
                    script: ScriptType.Elvish,
                }
            }
        ];

    const languageAPI = new LanguageAPI();

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = languageAPI.get(test.input);
            expect(actual).toBeDefined();
            if (actual !== undefined) {
                expect(actual.name).toEqual(test.expected.name);
                expect(actual.typicalSpeakers).toEqual(test.expected.typicalSpeakers);
                expect(actual.script).toEqual(test.expected.script);
            }
            done();
        });
    });
});

describe('languages.list', () => {

    it('count', () => {
        const languageAPI = new LanguageAPI();

        const actual = languageAPI.list();

        expect(actual).toBeDefined();
        expect(actual).toHaveLength(16);
    })

});

describe('languages.query', () => {

    const tests: {
        name: string,
        input: Query,
        expected: LanguageType[],
    }[] = [
            {
                name: 'Westeria Goodfellow',
                input: {
                    types: [
                        LanguageType.Common,
                        LanguageType.Elvish,
                        LanguageType.Sylvan,
                        LanguageType.Giant,
                    ],
                },
                expected: [
                    LanguageType.Common,
                    LanguageType.Elvish,
                    LanguageType.Giant,
                    LanguageType.Sylvan,
                ]
            },
            {
                name: 'Elvish Script',
                input: {
                    scripts: [
                        ScriptType.Elvish,
                    ]
                },
                expected: [
                    LanguageType.Elvish,
                    LanguageType.Sylvan,
                    LanguageType.Undercommon,
                ],
            },
            {
                name: 'Common Script',
                input: {
                    scripts: [
                        ScriptType.Common,
                    ]
                },
                expected: [
                    LanguageType.Common,
                    LanguageType.Halfling,
                ],
            },
            {
                name: 'Heaven and Hell',
                input: {
                    scripts: [
                        ScriptType.Celestial,
                        ScriptType.Infernal,
                    ]
                },
                expected: [
                    LanguageType.Abyssal,
                    LanguageType.Celestial,
                    LanguageType.Infernal,
                ],
            }
        ];

    const languageAPI = new LanguageAPI();

    tests.forEach((test) => {
        it(test.name, (done) => {
            const actual = languageAPI.query(test.input);
            expect(actual).toBeDefined();
            expect(actual).toHaveLength(test.expected.length);
            for (let i = 0; i < actual.length; i++) {
                expect(actual[i].name).toEqual(test.expected[i]);
            }
            done();
        });
    });

});

describe('validate', () => {

    const scriptUnion = io_ts.union([
        io_ts.literal('none'),
        io_ts.literal('celestial'),
        io_ts.literal('common'),
        io_ts.literal('draconic'),
        io_ts.literal('dwarvish'),
        io_ts.literal('elvish'),
        io_ts.literal('infernal'),
    ]);

    const objectInterface = io_ts.interface({
        name: languageUnion,
        typicalSpeakers: io_ts.array(io_ts.string),
        script: scriptUnion,
    });

    const languageAPI = new LanguageAPI();
    const languageList = languageAPI.list();

    languageList.forEach((language) => {
        it(language.name, (done) => {
            const result = objectInterface.decode(language);
            ThrowReporter.report(result);
            done();
        });
    })
});
