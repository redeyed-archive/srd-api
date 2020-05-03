import Race from '../models/Race';
import races from '../../public/races.json';

export interface Query {
    name?: string;
}

export default class RaceAPI {

    private raceByName = new Map<string, Race>();

    constructor() {
        this.init();
    }

    public get(name: string): Race | undefined {
        return this.raceByName.get(name.toLowerCase());
    }

    public list(): Race[] {
        return Array.from(this.raceByName.values());
    }

    public query(query: Query): Race[] {
        let list = new Array<Race>();

        let nameList = Array.from(this.raceByName.keys());

        if (query.name !== undefined && query.name !== '') {
            const regex = new RegExp(`.*${query.name.split(' ').join('.*')}.*`, 'gmi');
            nameList = nameList.filter((value) => value.match(regex))
        }

        nameList.forEach((name) => {
            const item = this.raceByName.get(name);
            if (item !== undefined) {
                list.push(item);
            }
        })

        return list;
    }

    private init() {
        if (this.raceByName.size === 0) {
            (races as Race[]).forEach((race: Race) => {

                const key = race.name.toLowerCase();

                this.raceByName.set(key, race);
            });
        }
    }
}