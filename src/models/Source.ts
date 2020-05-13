import Condition from './Condition';
import conditionData from '../../public/conditions.json'
import Language from './Language';
import languageData from '../../public/languages.json'
import Race from './Race';
import raceData from '../../public/races.json';
import Spell from './Spell';
import spellData from '../../public/spells.json';

export default interface Source {
    name: string;
    conditions?: Condition[];
    languages?: Language[];
    races?: Race[];
    spells?: Spell[];
}

export const BasicRules: Source = {
    name: 'srd',
    conditions: conditionData as Condition[],
    languages: languageData as Language[],
    races: raceData as Race[],
    spells: spellData as Spell[],
}
