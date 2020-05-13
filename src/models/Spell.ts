import { Ability } from '../shared/Abilities';
import { AttackType } from '../shared/Attacks';
import { DamageType } from '../shared/DamageType';
import { Description } from '../shared/Description';

export enum Duration {
    Instantaneous = 'instantaneous',
    Round = '1 round',
    Minutes1 = '1 minute',
    Minutes10 = '10 minutes',
    Hours1 = '1 hour',
    Hours2 = '2 hours',
    Hours8 = '8 hours',
    Hours24 = '24 hours',
    Days1 = '1 day',
    Days7 = '7 days',
    Days10 = '10 days',
    Days3 = '30 days',
    Special = 'special',
    UntilDispelled = 'until dispelled',
}

export enum CastingTime {
    Reaction = 'reaction',
    BonusAction = 'bonus action',
    Action = 'action',
    Minutes1 = '1 minute',
    Minute10 = '10 minutes',
    Hours1 = '1 hour',
    Hours8 = '8 hours',
    Hours12 = '12 hours',
    Hours24 = '24 hours',
}

export interface Components {
    verbal?: boolean;
    somatic?: boolean;
    material?: Material;
}

export interface Material {
    description: string;
    consumed: boolean;
}

export enum School {
    Abjuration = 'abjuration',
    Conjuration = 'conjuration',
    Divination = 'divination',
    Enchantment = 'enchantment',
    Evocation = 'evocation',
    Illusion = 'illusion',
    Necromancy = 'necromancy',
    Transmutation = 'transmutation',
}

export enum Range {
    Self = 'self',
    Touch = 'touch',
    Sight = 'sight',
    Feet5 = '5 feet',
    Feet10 = '10 feet',
    Feet30 = '30 feet',
    Feet60 = '60 feet',
    Feet90 = '90 feet',
    Feet100 = '100 feet',
    Feet120 = '120 feet',
    Feet150 = '150 feet',
    Feet300 = '300 feet',
    Feet500 = '500 feet',
    Miles1 = '1 mile',
    Miles500 = '500 miles',
    Special = 'special',
    Unlimited = 'unlimited',
}

export enum AreaShape {
    Cone = 'cone',
    Cube = 'cube',
    Cylinder = 'cylinder',
    Line = 'line',
    Sphere = 'sphere',
}

export interface Area {
    shape: AreaShape;
    size: number;
    unit: 'feet' | 'miles';
}

export default interface Spell {
    name: string;
    area?: Area;
    attack?: AttackType;
    castingTime: CastingTime;
    classes: string[];
    components: Components;
    concentration: boolean;
    conditions?: string[];
    damageType?: DamageType[];
    description: Description[];
    duration: Duration;
    higherLevels?: Description[];
    level: number;
    range: Range;
    reactionTrigger?: string;
    ritual: boolean;
    save?: Ability;
    school: School;
}
