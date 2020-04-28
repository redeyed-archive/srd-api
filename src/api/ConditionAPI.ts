import Condition, { ConditionType } from '../models/Condition';
import conditionData from '../../public/conditions.json';

export default class ConditionAPI {

    private conditionByType = new Map<ConditionType, Condition>();

    constructor() {
        this.init();
    }

    public get(conditionType: ConditionType): Condition | undefined {
        return this.conditionByType.get(conditionType);
    }

    public list(): Condition[] {
        return conditionData as Condition[];
    }

    private init() {
        if (this.conditionByType.size === 0) {
            (conditionData as Condition[]).forEach((condition: Condition) => {
                this.conditionByType.set(condition.name, condition);
            });
        }
    }
}
