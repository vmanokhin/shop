import { List, Record } from 'immutable';
import { createSelector } from 'reselect';
// import axios from '../libs/axios';
import { appName, /*apiUrl*/ } from '../config';
import uniq from 'lodash/uniq';


const ReducerRecord = Record({
    ids: List()
}, 'CartReducerRecord');

export const moduleName = 'cart';
const prefix = `${appName}/${moduleName}`;

const ADD_TO_CART = `${prefix}/ADD_TO_CART`;
const PRODUCT_INCREMENT = `${prefix}/PRODUCT_INCREMENT`;
const PRODUCT_DECREMENT = `${prefix}/PRODUCT_DECREMENT`;
const PRODUCT_DELETE = `${prefix}/PRODUCT_DELETE`;
const CLEAR_CART = `${prefix}/CLEAR_CART`;


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch(type) {
        case PRODUCT_DELETE: {
            return state.updateIn(['ids'], ids => ids.filter(id => id !== payload.id));
        }

        case PRODUCT_DECREMENT: {
            return state.deleteIn(['ids', state.get('ids').indexOf(payload.id)]);
        }

        case PRODUCT_INCREMENT:
        case ADD_TO_CART: {
            return state.mergeIn(['ids'], payload.id);
        }

        case CLEAR_CART: {
            return new ReducerRecord();
        }

        default: {
            return state;
        }
    }
}

/* Selectors */
export const sizeGetter = state => state[moduleName].ids.size;
const idsGetter = state => state[moduleName].ids;
const idGetter = (_, ownProps) => ownProps.id;

export const idsArraySelector = createSelector(idsGetter, ids => ids.toArray());

export const uniqIdsSelector = createSelector(idsArraySelector, (ids) => {
    return uniq(ids).sort((a, b) => a.localeCompare(b));
});

export const countByIdSelector = createSelector(idsArraySelector, idGetter, (ids, id) => {
    return ids.filter(cartId => cartId === id).length;
});

/* Actions */
export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        payload: { id }
    }
}

export function deleteProduct(id) {
	return {
		type: PRODUCT_DELETE,
        payload: { id }
	}
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function incrementProduct(id) {
    return {
        type: PRODUCT_INCREMENT,
        payload: { id }
    }
}

export function decrementProduct(id) {
    return {
        type: PRODUCT_DECREMENT,
        payload: { id }
    }
}
