
import Condition, { ConditionType } from './models/Condition';
import ConditionAPI from './api/ConditionAPI';
import Language, { LanguageType } from './models/Language';
import LanguageAPI, { Query as LanguageQuery } from './api/LanguageAPI';
import Spell from './models/Spell';
import SpellAPI, { Query as SpellQuery } from './api/SpellAPI';

export {
    Condition,
    ConditionAPI,
    ConditionType,
    Language,
    LanguageAPI,
    LanguageType,
    LanguageQuery,
    SpellAPI,
    Spell,
    SpellQuery,
}

let conditionAPI: ConditionAPI;
let languageAPI: LanguageAPI;
let spellAPI: SpellAPI;

export default {
    conditions: {
        get: (conditionType: ConditionType): Condition | undefined => {
            if (conditionAPI === undefined) {
                conditionAPI = new ConditionAPI();
            }
            return conditionAPI.get(conditionType);
        },
        list: (): Condition[] => {
            if (conditionAPI === undefined) {
                conditionAPI = new ConditionAPI();
            }
            return conditionAPI.list();
        }
    },
    languages: {
        get: (languageType: LanguageType): Language | undefined => {
            if (languageAPI === undefined) {
                languageAPI = new LanguageAPI();
            }
            return languageAPI.get(languageType);
        },
        list: () => {
            if (languageAPI === undefined) {
                languageAPI = new LanguageAPI();
            }
            return languageAPI.list();
        },
        query: (query: LanguageQuery) => {
            if (languageAPI === undefined) {
                languageAPI = new LanguageAPI();
            }
            return languageAPI.query(query);
        },
    },
    spells: {
        get: (name: string): Spell | undefined => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.get(name);
        },
        list: () => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.list();
        },
        query: (query: SpellQuery) => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.query(query);
        },
    }
}
