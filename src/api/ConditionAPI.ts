import Condition from '../models/Condition';

export default class ConditionAPI {

    private conditionByType = new Map<string, Condition>();

    constructor(conditions: Condition[]) {
        conditions.forEach((condition: Condition) => {
            this.conditionByType.set(condition.name.toLowerCase(), condition);
        });
    }

    public get(conditionType: string): Condition | undefined {
        return this.conditionByType.get(conditionType.toLowerCase());
    }

    public list(): Condition[] {
        return Array.from(this.conditionByType.values());
    }
}
