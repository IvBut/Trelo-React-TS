

export const moveItem = <T>(array: Array<T>, from: number, to: number) => {
    const startIndex = to < 0 ? array.length + to: to;
    const item = array.splice(from,1)[0];
    array.splice(to,0,item);
    return array;
};