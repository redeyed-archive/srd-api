import languages from '../../public/languages.json';
import LanguageAPI, { Query } from './LanguageAPI';
import * as io_ts from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import Language from '../models/Language';

describe('languages.get', () => {

    const tests: {
        name: string,
        input: string,
        expected: Language,
    }[] = [
            {
                name: 'Abyssal',
                input: 'Abyssal',
                expected: {
                    name: 'Abyssal',
                    typicalSpeakers: [
                        'Demons'
                    ],
                    script: 'Infernal',
                }
            },
            {
                name: 'Abyssal, lowercase',
                input: 'abyssal',
                expected: {
                    name: 'Abyssal',
                    typicalSpeakers: [
                        'Demons'
                    ],
                    script: 'Infernal',
                }
            },
            {
                name: 'Deep Speech',
                input: 'Deep Speech',
                expected: {
                    name: 'Deep Speech',
                    typicalSpeakers: [
                        'Aboleths',
                        'cloakers'
                    ],
                    script: 'None',
                }
            },
            {
                name: 'Sylvan',
                input: 'Sylvan',
                expected: {
                    name: 'Sylvan',
                    typicalSpeakers: [
                        'Fey creatures'
                    ],
                    script: 'Elvish',
                }
            }
        ];

    const languageAPI = new LanguageAPI(languages as Language[]);

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
        const languageAPI = new LanguageAPI(languages as Language[]);

        const actual = languageAPI.list();

        expect(actual).toBeDefined();
        expect(actual).toHaveLength(16);
    })

});

describe('languages.query', () => {

    const tests: {
        name: string,
        input: Query,
        expected: string[],
    }[] = [
            {
                name: 'Westeria Goodfellow',
                input: {
                    types: [
                        'Common',
                        'Elvish',
                        'Sylvan',
                        'Giant',
                    ],
                },
                expected: [
                    'Common',
                    'Elvish',
                    'Giant',
                    'Sylvan',
                ]
            },
            {
                name: 'Elvish Script',
                input: {
                    scripts: [
                        'Elvish',
                    ]
                },
                expected: [
                    'Elvish',
                    'Sylvan',
                    'Undercommon',
                ],
            },
            {
                name: 'Common Script',
                input: {
                    scripts: [
                        'Common',
                    ]
                },
                expected: [
                    'Common',
                    'Halfling'
                ],
            },
            {
                name: 'Heaven and Hell',
                input: {
                    scripts: [
                        'Celestial',
                        'Infernal',
                    ]
                },
                expected: [
                    'Abyssal',
                    'Celestial',
                    'Infernal',
                ],
            }
        ];

    const languageAPI = new LanguageAPI(languages as Language[]);

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

    const objectInterface = io_ts.interface({
        name: io_ts.string,
        typicalSpeakers: io_ts.array(io_ts.string),
        script: io_ts.string,
    });

    (languages as Language[]).forEach((language) => {
        it(language.name, (done) => {
            const result = objectInterface.decode(language);
            ThrowReporter.report(result);
            done();
        });
    })
});
