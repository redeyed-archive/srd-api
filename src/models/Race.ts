import Movement from '../shared/Movement';
import { Size } from '../shared/Size';
import { Description } from '../shared/Description';
import { LanguageType } from './Language';


export interface RacialTrait {
    name: string;
    description: Description[];
}

export interface Subrace {
    name: string;
    description?: Description[];
    size?: Size;
    speed?: Movement;
    languages?: (LanguageType | 'choice')[];
    traits: RacialTrait[];
}

export default interface Race {
    name: string;
    description?: Description[];
    size: Size;
    speed: Movement;
    languages: (LanguageType | 'choice')[];
    traits: RacialTrait[];
    subraces?: Subrace[];
}