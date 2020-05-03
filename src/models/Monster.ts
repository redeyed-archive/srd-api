import { Description } from '../shared/Description';
import { Size } from '../shared/Size';
import { Alignment } from '../shared/Alignment';
import { Ability } from '../shared/Abilities';
import { Skill } from '../shared/Skills';
import { Proficiency } from '../shared/Proficiency';
import Senses from '../shared/Sense';

function getProfBonus(cr: number): number {
    switch (cr) {
        case 0: return 2;
        case 1 / 8: return 2;
        case 1 / 4: return 2;
        case 1 / 2: return 2;
        case 1: return 2;
        case 2: return 2;
        case 3: return 2;
        case 4: return 2;
        case 5: return 3;
        case 6: return 3;
        case 7: return 3;
        case 8: return 3;
        case 9: return 4;
        case 10: return 4;
        case 11: return 4;
        case 12: return 4;
        case 13: return 5;
        case 14: return 5;
        case 15: return 5;
        case 16: return 5;
        case 17: return 6;
        case 18: return 6;
        case 19: return 6;
        case 20: return 6;
        case 21: return 7;
        case 22: return 7;
        case 23: return 7;
        case 24: return 7;
        case 25: return 8;
        case 26: return 8;
        case 27: return 8;
        case 28: return 8;
        case 29: return 9;
        case 30: return 9;
    }
    return 0;
}

function getExperiencePoints(challengeRating: number): number {
    switch (challengeRating) {
        case 0: return 10;
        case 1 / 8: return 25;
        case 1 / 4: return 50;
        case 1 / 2: return 100;
        case 1: return 200;
        case 2: return 450;
        case 3: return 700;
        case 4: return 1100;
        case 5: return 1800;
        case 6: return 2300;
        case 7: return 2900;
        case 8: return 3900;
        case 9: return 5000;
        case 10: return 5900;
        case 11: return 7200;
        case 12: return 8400;
        case 13: return 10000;
        case 14: return 11500;
        case 15: return 13000;
        case 16: return 15000;
        case 17: return 18000;
        case 18: return 20000;
        case 19: return 22000;
        case 20: return 25000;
        case 21: return 33000;
        case 22: return 41000;
        case 23: return 50000;
        case 24: return 62000;
        case 25: return 75000;
        case 26: return 90000;
        case 27: return 105000;
        case 28: return 120000;
        case 29: return 135000;
        case 30: return 155000;
    }

    return 0
};

export enum MonsterType {
    Aberration = 'aberration',
    Beast = 'beast',
    Celestials = 'celestials',
    Construct = 'construct',
    Dragon = 'dragon',
    Elemental = 'elemental',
    Fey = 'fey',
    Fiend = 'fiend',
    Giant = 'giant',
    Humanoid = 'humanoid',
    Monstrosity = 'monstrosity',
    Ooze = 'ooze',
    Plant = 'plant',
    Undead = 'undead',
}

export interface MonsterTypeDefinition {
    name: MonsterType;
    description: Description[];
}

export default interface Monster {
    name: string;
    type: MonsterType[];
    size: Size;
    alignment: Alignment;
    armourClass: number;
    hitPoints: number[];
    movement: string[];
    abilities: Map<Ability, number>;
    savingThrows: Map<Ability, Proficiency>;
    skills: Map<Skill, Proficiency>;
    senses: Senses[];
    languages: string[];
    challengeRating: number;
    specialTraits: string[];
    actions: string[];
    reactions: string[];
    legendaryActions: string[];
}
