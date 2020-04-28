
export interface DescriptionList {
    type: 'list',
    title?: string,
    content: string[],
}

export interface DescriptionTable {
    type: 'title',
    title?: string,
    content: string[][],
}

export type Description = string | DescriptionList | DescriptionTable;
