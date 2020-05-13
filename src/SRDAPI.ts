
import Condition from './models/Condition';
import ConditionAPI from './api/ConditionAPI';
import LanguageAPI from './api/LanguageAPI';
import RaceAPI from './api/RaceAPI';
import SpellAPI from './api/SpellAPI';
import Race from './models/Race';
import Language from './models/Language';
import Spell from './models/Spell';
import Source, { BasicRules } from './models/Source';

export interface Options {
    includeBasicRules: boolean;
    sources?: Source[];
}

export default class SRDAPI {
    public conditions: ConditionAPI;
    public languages: LanguageAPI;
    public races: RaceAPI;
    public spells: SpellAPI;

    constructor(options: Options = { includeBasicRules: true }) {

        const sources = options.sources || [];
        if (options.includeBasicRules) {
            sources.push(BasicRules);
        }

        let conditions: Condition[] = [];
        let languages: Language[] = [];
        let races: Race[] = [];
        let spells: Spell[] = [];

        sources.forEach((source) => {
            if (source.conditions) {
                conditions.push(...source.conditions);
            }
            if (source.languages) {
                languages.push(...source.languages);
            }
            if (source.races) {
                races.push(...source.races);
            }
            if (source.spells) {
                spells.push(...source.spells);
            }
        });

        this.conditions = new ConditionAPI(conditions);
        this.languages = new LanguageAPI(languages)
        this.races = new RaceAPI(races)
        this.spells = new SpellAPI(spells);
    }
}

