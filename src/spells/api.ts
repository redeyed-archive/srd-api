import Spell, { School } from '../models/Spell';
import spellData from '../../public/spells.json';
import { ClassType } from '../shared/Classes';
import { Ability } from '../shared/Abilities';
import { AttackType } from '../shared/Attacks';

export class Query {
    name?: string;
    classes?: ClassType[];
    levels?: number[];
    schools?: School[];
    attackTypes?: AttackType[];
    saveTypes?: Ability[];
}

export default class API {

    private spellByName = new Map<string, Spell>();
    private spellsByClass = new Map<ClassType, string[]>();
    private spellsByLevel = new Map<number, string[]>();
    private spellsBySchool = new Map<School, string[]>();
    private spellsByAttackType = new Map<AttackType, string[]>();
    private spellsBySaveType = new Map<Ability, string[]>();

    constructor() {
        this.init();
    }

    public get(name: string): Spell | undefined {
        return this.spellByName.get(name.toLowerCase());
    }

    public list(): Spell[] {
        return spellData as Spell[];
    }

    public query(query: Query): Spell[] {
        let spellList = new Array<Spell>();

        let spellNameList = new Array<string>();
        if (query.classes !== undefined && query.classes.length > 0) {
            let array = new Array<string>();
            query.classes.forEach((classType) => {
                let subArray = this.spellsByClass.get(classType) || [];
                if (subArray.length > 0) {
                    array.push(...subArray)
                }
            })
            if (array.length > 0) {
                spellNameList.push(...array);
            }
        }
        if (query.levels !== undefined && query.levels.length > 0) {
            let array = new Array<string>();
            query.levels.forEach((level) => {
                let subArray = this.spellsByLevel.get(level) || [];
                if (subArray.length > 0) {
                    array.push(...subArray)
                }
            })
            if (array.length > 0) {
                if (spellNameList.length > 0) {
                    spellNameList = spellNameList.filter((value) => array.includes(value));
                } else {
                    spellNameList.push(...array);
                }
            }
        }
        if (query.schools !== undefined) {
            let array = new Array<string>();
            query.schools.forEach((school) => {
                let subArray = this.spellsBySchool.get(school) || [];
                if (subArray.length > 0) {
                    array.push(...subArray)
                }
            })
            if (array.length > 0) {
                if (spellNameList.length > 0) {
                    spellNameList = spellNameList.filter((value) => array.includes(value));
                } else {
                    spellNameList.push(...array);
                }
            }
        }

        if (query.attackTypes !== undefined && query.attackTypes.length > 0) {
            let array = new Array<string>();
            query.attackTypes.forEach((attackType) => {
                let subArray = this.spellsByAttackType.get(attackType) || [];
                if (subArray.length > 0) {
                    array.push(...subArray)
                }
            })
            if (array.length > 0) {
                if (spellNameList.length > 0) {
                    spellNameList = spellNameList.filter((value) => array.includes(value));
                } else {
                    spellNameList.push(...array);
                }
            }
        }

        if (query.saveTypes !== undefined && query.saveTypes.length > 0) {
            let array = new Array<string>();
            query.saveTypes.forEach((saveType) => {
                let subArray = this.spellsBySaveType.get(saveType) || [];
                if (subArray.length > 0) {
                    array.push(...subArray)
                }
            })
            if (array.length > 0) {
                if (spellNameList.length > 0) {
                    spellNameList = spellNameList.filter((value) => array.includes(value));
                } else {
                    spellNameList.push(...array);
                }
            }
        }

        if (query.name !== undefined && query.name !== '') {
            const regex = new RegExp(`.*${query.name}.*`, 'gmi');
            if (spellNameList.length === 0) {
                spellNameList = Array.from(this.spellByName.keys());
            }
            spellNameList = spellNameList.filter((value) => value.match(regex))
        }

        spellNameList.forEach((spellName) => {
            const spell = this.spellByName.get(spellName);
            if (spell !== undefined) {
                spellList.push(spell);
            }
        })

        return spellList;
    }

    private init() {
        if (this.spellByName.size === 0) {
            (spellData as Spell[]).forEach((spell: Spell) => {
                const key = spell.name.toLowerCase()
                this.spellByName.set(key, spell);

                spell.classes.forEach((spellcaster) => {
                    let classArray = this.spellsByClass.get(spellcaster);
                    if (classArray === undefined) {
                        classArray = new Array<string>();
                        this.spellsByClass.set(spellcaster, classArray);
                    }
                    classArray.push(key);
                });

                let levelArray = this.spellsByLevel.get(spell.level);
                if (levelArray === undefined) {
                    levelArray = new Array<string>();
                    this.spellsByLevel.set(spell.level, levelArray);
                }
                levelArray.push(key);

                let schoolArray = this.spellsBySchool.get(spell.school);
                if (schoolArray === undefined) {
                    schoolArray = new Array<string>();
                    this.spellsBySchool.set(spell.school, schoolArray);
                }
                schoolArray.push(key);

                if (spell.attack !== undefined) {
                    let array = this.spellsByAttackType.get(spell.attack) || [];
                    array.push(key);
                    this.spellsByAttackType.set(spell.attack, array)
                }

                if (spell.save !== undefined) {
                    let array = this.spellsBySaveType.get(spell.save) || [];
                    array.push(key);
                    this.spellsBySaveType.set(spell.save, array)
                }
            });
        }
    }
}