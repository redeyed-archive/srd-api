import SpellAPI, { Query as SpellQuery } from './api/SpellAPI';
import ConditionAPI from './api/ConditionAPI';
import Spell from './models/Spell';
import Condition, { ConditionType } from './models/Condition';

export {
    SpellAPI,
    Spell,
    SpellQuery
}

let spellAPI: SpellAPI;
let conditionAPI: ConditionAPI;

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
