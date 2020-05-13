import { Description } from '../shared/Description';

export default interface Condition {
    name: string;
    description: Description[];
    linkedConditions?: string[];
}
