
export enum MovementType {
    Burrow = 'burrow',
    Climb = 'climb',
    Fly = 'fly',
    Swim = 'swim',
    Walk = 'walk',
}

export default interface Movement {
    burrow?: number;
    climb?: number;
    fly?: number;
    hover?: boolean;
    swim?: number;
    walk?: number;
}
