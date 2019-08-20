import { List, Record } from 'immutable';
// import { createSelector } from 'reselect';
// import axios from '../libs/axios';
import { appName, /*apiUrl*/ } from '../config';

const ReducerRecord = Record({
    ids: List()
}, 'ReducerRecord');

export const moduleName = 'cart';
const prefix = `${appName}/${moduleName}`;

const ADD_TO_CART = `${prefix}/ADD_TO_CART`;


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch(type) {
        case ADD_TO_CART: {
            return state.update('ids', (ids) => ids.push(payload.id));
        }

        default: {
            return state;
        }
    }
}

/* Selectors */
export const cartSizeGetter = state => state[moduleName].ids.size;

/* Actions */
export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        payload: { id }
    }
}
/* Side effects */