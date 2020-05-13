import SRDAPI, { Options } from './SRDAPI';
import { Size } from './shared/Size';
import { CastingTime, Duration, Range, School } from './models/Spell';

describe('conditions', () => {

    const tests: {
        name: string,
        options: Options,
        expected: {
            length: number,
        }
    }[] = [
            {
                name: 'basic',
                options: {
                    includeBasicRules: true
                },
                expected: {
                    length: 15,
                }
            },
            {
                name: 'none',
                options: {
                    includeBasicRules: false,
                },
                expected: {
                    length: 0,
                }
            },
            {
                name: 'homebrew',
                options: {
                    includeBasicRules: true,
                    sources: [
                        {
                            name: 'homebrew',
                            conditions: [
                                {
                                    name: 'blooded',
                                    description: [''],
                                }
                            ]
                        }
                    ]
                },
                expected: {
                    length: 16
                }
            }
        ];

    tests.forEach((test) => {
        it(test.name, (done) => {
            const srdAPI = new SRDAPI(test.options);
            const list = srdAPI.conditions.list();
            expect(list).toBeDefined()
            expect(list.length).toEqual(test.expected.length);
            done();
        });
    });
});

describe('languages', () => {

    const tests: {
        name: string,
        options: Options,
        expected: {
            length: number,
        }
    }[] = [
            {
                name: 'basic',
                options: {
                    includeBasicRules: true
                },
                expected: {
                    length: 16,
                }
            },
            {
                name: 'none',
                options: {
                    includeBasicRules: false,
                },
                expected: {
                    length: 0,
                }
            },
            {
                name: 'homebrew',
                options: {
                    includeBasicRules: true,
                    sources: [
                        {
                            name: 'homebrew',
                            languages: [
                                {
                                    name: 'scots',
                                    script: 'common',
                                    typicalSpeakers: ['scots']
                                }
                            ]
                        }
                    ]
                },
                expected: {
                    length: 17
                }
            }
        ];

    tests.forEach((test) => {
        it(test.name, (done) => {
            const srdAPI = new SRDAPI(test.options);
            const list = srdAPI.languages.list();
            expect(list).toBeDefined()
            expect(list.length).toEqual(test.expected.length);
            done();
        });
    });
});

describe('races', () => {

    const tests: {
        name: string,
        options: Options,
        expected: {
            length: number,
        }
    }[] = [
            {
                name: 'basic',
                options: {
                    includeBasicRules: true
                },
                expected: {
                    length: 9,
                }
            },
            {
                name: 'none',
                options: {
                    includeBasicRules: false,
                },
                expected: {
                    length: 0,
                }
            },
            {
                name: 'homebrew',
                options: {
                    includeBasicRules: true,
                    sources: [
                        {
                            name: 'homebrew',
                            races: [
                                {
                                    languages: ['none'],
                                    name: 'custom',
                                    size: Size.Small,
                                    speed: {},
                                    traits: [],
                                }
                            ]
                        }
                    ]
                },
                expected: {
                    length: 10,
                }
            }
        ];

    tests.forEach((test) => {
        it(test.name, (done) => {
            const srdAPI = new SRDAPI(test.options);
            const list = srdAPI.races.list();
            expect(list).toBeDefined()
            expect(list.length).toEqual(test.expected.length);
            done();
        });
    });
});

describe('spells', () => {

    const tests: {
        name: string,
        options: Options,
        expected: {
            length: number,
        }
    }[] = [
            {
                name: 'basic',
                options: {
                    includeBasicRules: true
                },
                expected: {
                    length: 304,
                }
            },
            {
                name: 'none',
                options: {
                    includeBasicRules: false,
                },
                expected: {
                    length: 0,
                }
            },
            {
                name: 'homebrew',
                options: {
                    includeBasicRules: true,
                    sources: [
                        {
                            name: 'homebrew',
                            spells: [
                                {
                                    castingTime: CastingTime.Action,
                                    classes: [],
                                    components: {},
                                    concentration: false,
                                    description: [],
                                    duration: Duration.Instantaneous,
                                    level: 0,
                                    name: '',
                                    range: Range.Touch,
                                    ritual: false,
                                    school: School.Illusion,
                                }
                            ]
                        }
                    ]
                },
                expected: {
                    length: 305,
                }
            },
        ];

    tests.forEach((test) => {
        it(test.name, (done) => {
            const srdAPI = new SRDAPI(test.options);
            const list = srdAPI.spells.list();
            expect(list).toBeDefined()
            expect(list.length).toEqual(test.expected.length);
            done();
        });
    });
});