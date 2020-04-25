import SpellAPI, { Query as SpellQuery } from './spells/api';
import Spell from './models/Spell';

export {
    SpellAPI,
    Spell,
    SpellQuery
}

let spellAPI: SpellAPI;

export default {
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
