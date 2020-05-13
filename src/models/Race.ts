import Movement from '../shared/Movement';
import { Size } from '../shared/Size';
import { Description } from '../shared/Description';


export interface RacialTrait {
    name: string;
    description: Description[];
}

export interface Subrace {
    name: string;
    description?: Description[];
    size?: Size;
    speed?: Movement;
    languages?: string[];
    traits: RacialTrait[];
}

export default interface Race {
    name: string;
    description?: Description[];
    size: Size;
    speed: Movement;
    languages: string[];
    traits: RacialTrait[];
    subraces?: Subrace[];
}