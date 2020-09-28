export interface IItem {
    id: string
}

export const findItemIndexById = <T extends IItem>(items: Array<T>, id: string) => {
    return items.findIndex((item: T) => item.id === id)
};