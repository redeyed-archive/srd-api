import Race from '../models/Race';

export interface Query {
    name?: string;
}

export default class RaceAPI {

    private raceByName = new Map<string, Race>();

    constructor(races: Race[]) {
        if (this.raceByName.size === 0) {
            races.forEach((race: Race) => {
                const key = race.name.toLowerCase();
                this.raceByName.set(key, race);
            });
        }
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
}
