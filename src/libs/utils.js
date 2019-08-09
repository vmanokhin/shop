import { OrderedMap } from "immutable";

export function objectToOrderMap(obj, Model = new OrderedMap()) {
    return Object.keys(obj).reduce((map, cur) => {
        return map.set(cur, Model(obj[cur]));
    }, new OrderedMap());
}

export function mapToOrderedMap(arr, Model = new OrderedMap()) {
    return arr.reduce((map, cur) => {
        return map.set(cur.id, Model(cur));
    }, new OrderedMap());
}

export function immutableMapToArr(Model) {
    return Model.valueSeq().toArray();
}