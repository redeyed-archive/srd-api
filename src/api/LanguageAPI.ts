import Language from '../models/Language';

export interface Query {
    types?: string[];
    scripts?: string[];
}

export default class LanguageAPI {

    private languageByType = new Map<string, Language>();
    private languageByScript = new Map<string, string[]>();

    constructor(languages: Language[]) {
        languages.forEach((language: Language) => {
            const key = language.name.toLowerCase()
            this.languageByType.set(key, language);

            const scriptArray = this.languageByScript.get(language.script.toLowerCase()) || [];
            scriptArray.push(key);
            this.languageByScript.set(language.script.toLowerCase(), scriptArray);
        });
    }

    public get(name: string): Language | undefined {
        return this.languageByType.get(name.toLowerCase());
    }

    public list(): Language[] {
        return Array.from(this.languageByType.values());
    }

    public query(query: Query): Language[] {
        let languageTypes = Array.from(this.languageByType.keys());

        if (query.types !== undefined && query.types.length > 0) {
            const array = new Array<string>();
            query.types.forEach((languageType) => {
                array.push(languageType.toLowerCase());
            });
            languageTypes = languageTypes.filter((value) => array.includes(value));
        }

        if (query.scripts !== undefined && query.scripts.length > 0) {
            const array = new Array<string>();
            query.scripts.forEach((scriptType) => {
                const byScript = this.languageByScript.get(scriptType.toLowerCase()) || [];
                array.push(...byScript);
            });
            languageTypes = languageTypes.filter((value) => array.includes(value));
        }

        const languageList = new Array<Language>();
        languageTypes.forEach((languageType: string) => {
            const language = this.languageByType.get(languageType.toLowerCase());
            if (language !== undefined) {
                languageList.push(language);
            }
        })

        return languageList;
    }
}
