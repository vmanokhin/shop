import { OrderedMap } from "immutable";

export function objectToOrderMap(obj, Model = new OrderedMap()) {
    return Object.keys(obj).reduce((map, cur) => {
        return map.set(cur, Model(obj[cur]));
    }, new OrderedMap());
}

export function immutableMapToArr(Model) {
    return Model.valueSeq().toArray();
}