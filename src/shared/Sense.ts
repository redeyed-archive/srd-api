
export enum SenseType {
    Blindsight,
    Darkvision,
    Telepathy,
    Tremorsense,
    Truesight
}

export default interface Sense {
    type: SenseType;
    distance?: number;
}
