
import Condition, { ConditionType } from './models/Condition';
import ConditionAPI from './api/ConditionAPI';
import Language, { LanguageType } from './models/Language';
import LanguageAPI, { Query as LanguageQuery } from './api/LanguageAPI';
import Race from './models/Race';
import RaceAPI, { Query as RaceQuery } from './api/RaceAPI';
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
    Race,
    RaceAPI,
    RaceQuery,
    SpellAPI,
    Spell,
    SpellQuery,
}

let conditionAPI: ConditionAPI;
let languageAPI: LanguageAPI;
let raceAPI: RaceAPI;
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
        list: (): Language[] => {
            if (languageAPI === undefined) {
                languageAPI = new LanguageAPI();
            }
            return languageAPI.list();
        },
        query: (query: LanguageQuery): Language[] => {
            if (languageAPI === undefined) {
                languageAPI = new LanguageAPI();
            }
            return languageAPI.query(query);
        },
    },
    races: {
        get: (name: string): Race | undefined => {
            if (raceAPI === undefined) {
                raceAPI = new RaceAPI();
            }
            return raceAPI.get(name);
        },
        list: (): Race[] => {
            if (raceAPI === undefined) {
                raceAPI = new RaceAPI();
            }
            return raceAPI.list();
        },
        query: (query: RaceQuery): Race[] => {
            if (raceAPI === undefined) {
                raceAPI = new RaceAPI();
            }
            return raceAPI.query(query);
        },
    },
    spells: {
        get: (name: string): Spell | undefined => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.get(name);
        },
        list: (): Spell[] => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.list();
        },
        query: (query: SpellQuery): Spell[] => {
            if (spellAPI === undefined) {
                spellAPI = new SpellAPI();
            }
            return spellAPI.query(query);
        },
    }
}
