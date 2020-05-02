import languages from '../../public/languages.json';
import Language, { LanguageType, ScriptType } from '../models/Language';

export interface Query {
    types?: LanguageType[];
    scripts?: ScriptType[];
}

export default class LanguageAPI {

    private languageByType = new Map<LanguageType, Language>();
    private languageByScript = new Map<ScriptType, LanguageType[]>();

    constructor() {
        this.init();
    }

    public get(name: LanguageType): Language | undefined {
        return this.languageByType.get(name);
    }

    public list(): Language[] {
        return languages as Language[];
    }

    public query(query: Query): Language[] {
        let languageTypes = Array.from(this.languageByType.keys());

        if (query.types !== undefined && query.types.length > 0) {
            const array = new Array<LanguageType>();
            query.types.forEach((languageType) => {
                array.push(languageType);
            });
            languageTypes = languageTypes.filter((value) => array.includes(value));
        }

        if (query.scripts !== undefined && query.scripts.length > 0) {
            const array = new Array<LanguageType>();
            query.scripts.forEach((scriptType) => {
                const byScript = this.languageByScript.get(scriptType) || [];
                array.push(...byScript);
            });
            languageTypes = languageTypes.filter((value) => array.includes(value));
        }

        const languageList = new Array<Language>();
        languageTypes.forEach((languageType: LanguageType) => {
            const language = this.languageByType.get(languageType);
            if (language !== undefined) {
                languageList.push(language);
            }
        })

        return languageList;
    }

    private init() {
        if (this.languageByType.size === 0) {
            (languages as Language[]).forEach((language: Language) => {
                this.languageByType.set(language.name, language);

                const scriptArray = this.languageByScript.get(language.script) || [];
                scriptArray.push(language.name);
                this.languageByScript.set(language.script, scriptArray);
            });
        }
    }

}