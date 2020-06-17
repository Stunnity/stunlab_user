export function setIndex(array: any[]) {
    const length = array.length;
    let indexes = [];
    for (let i = 0; i < length; i++) {
        indexes.push(i);
    }
    const mapped = array.map((obj, i) => ({ "index": indexes[i], "book": obj }))
    return mapped;
}

export function copyArray(original: any[]) {
    let unfiltered = [], copied = [];
    copied = original.filter((obj) => {
        if (obj.index >= 4)
            unfiltered.push(obj);
        return obj.index < 4;
    })
    return [copied, unfiltered];
}

export function removeElement(e: number, array: any[]) {
    array.splice(e, 1);
}

export function addElement(filtered: any[], unfiltered: any[]) {
    filtered.push(unfiltered[0]['book']);
    unfiltered.splice(0, 1);
}


