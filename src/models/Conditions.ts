import { Description } from '../shared/Description';

export enum ConditionType {
    Blinded = 'Blinded',
    Charmed = 'Charmed',
    Deafened = 'Deafened',
    Exhaustion = 'Exhaustion',
    Frightened = 'Frightened',
    Grappled = 'Grappled',
    Incapacitated = 'Incapacitated',
    Invisible = 'Invisible',
    Paralyzed = 'Paralyzed',
    Petrified = 'Petrified',
    Poisoned = 'Poisoned',
    Prone = 'Prone',
    Restrained = 'Restrained',
    Stunned = 'Stunned',
    Unconscious = 'Unconscious',
}

export default interface Condition {
    name: ConditionType;
    description: Description[];
    linkedConditions?: ConditionType[];
}