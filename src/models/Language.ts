
export enum LanguageType {
    Abyssal = 'abyssal',
    Celestial = 'celestial',
    Common = 'common',
    DeepSpeech = 'deep speech',
    Draconic = 'draconic',
    Dwarvish = 'dwarvish',
    Elvish = 'elvish',
    Giant = 'giant',
    Gnomish = 'gnomish',
    Goblin = 'goblin',
    Halfling = 'halfling',
    Infernal = 'infernal',
    Orc = 'orc',
    Primordial = 'primordial',
    Sylvan = 'sylvan',
    Undercommon = 'undercommon',
}

export enum ScriptType {
    None = 'none',
    Celestial = 'celestial',
    Common = 'common',
    Draconic = 'draconic',
    Dwarvish = 'dwarvish',
    Elvish = 'elvish',
    Infernal = 'infernal',
}

export default interface Language {
    name: LanguageType;
    typicalSpeakers: string[];
    script: ScriptType;
}
