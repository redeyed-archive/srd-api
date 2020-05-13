import { MonsterType, MonsterTypeDefinition } from '../models/Monster';
import typeData from '../../public/monster_types.json';

export default class MonsterAPI {

    private monsterTypeDefinition = new Map<MonsterType, MonsterTypeDefinition>();

    constructor() {
        this.init();
    }

    public getType(conditionType: MonsterType): MonsterTypeDefinition | undefined {
        return this.monsterTypeDefinition.get(conditionType);
    }

    public listTypes(): MonsterTypeDefinition[] {
        return Array.from(this.monsterTypeDefinition.values());
    }

    private init() {
        if (this.monsterTypeDefinition.size === 0) {
            (typeData as MonsterTypeDefinition[]).forEach((monsterTypeDefinition: MonsterTypeDefinition) => {
                this.monsterTypeDefinition.set(monsterTypeDefinition.name, monsterTypeDefinition);
            });
        }
    }
}
