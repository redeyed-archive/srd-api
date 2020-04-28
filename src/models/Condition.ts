import { Description } from '../shared/Description';

export enum ConditionType {
    Blinded = 'blinded',
    Charmed = 'charmed',
    Deafened = 'deafened',
    Exhaustion = 'exhaustion',
    Frightened = 'frightened',
    Grappled = 'grappled',
    Incapacitated = 'incapacitated',
    Invisible = 'invisible',
    Paralyzed = 'paralyzed',
    Petrified = 'petrified',
    Poisoned = 'poisoned',
    Prone = 'prone',
    Restrained = 'restrained',
    Stunned = 'stunned',
    Unconscious = 'unconscious',
}

export default interface Condition {
    name: ConditionType;
    description: Description[];
    linkedConditions?: ConditionType[];
}
