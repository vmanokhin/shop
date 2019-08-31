import { List, Record } from 'immutable';
import { createSelector } from 'reselect';
// import axios from '../libs/axios';
import { appName, /*apiUrl*/ } from '../config';
import { productsGetter } from './products';
import groupBy from 'lodash/groupBy';
import lodashMap from 'lodash/map';
import sortBy from 'lodash/sortBy';


const ReducerRecord = Record({
    ids: List()
}, 'ReducerRecord');

export const moduleName = 'cart';
const prefix = `${appName}/${moduleName}`;

const ADD_TO_CART = `${prefix}/ADD_TO_CART`;
const PRODUCT_INCREMENT = `${prefix}/PRODUCT_INCREMENT`;
const PRODUCT_DECREMENT = `${prefix}/PRODUCT_DECREMENT`;
const PRODUCT_DELETE = `${prefix}/PRODUCT_DELETE`;
const CLEAR_CART = `${prefix}/CLEAR_CART`;
// const LOAD_SAVED_IDS_SUCCESS = `${prefix}/LOAD_SAVED_IDS_SUCCESS`;
// const LOAD_SAVED_IDS_FAILURE = `${prefix}/LOAD_SAVED_IDS_FAILURE`;


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
export const idsGetter = state => state[moduleName].ids;

export const productsCartSelector = createSelector(productsGetter, idsGetter, (products, ids) => {
    return ids.toArray().reduce((acc, curId) => {
        if (products.has(curId)) {
        	acc.push(products.get(curId));
        } 

        return acc;
    }, []);
});

export const productsCartNormalized = createSelector(productsCartSelector, (products) => {
	const groupProducts = groupBy(products, item => item.id);
	const normalized = lodashMap(groupProducts, (entities, id) => ({ id, entities }));
    const sorted = sortBy(normalized, 'id');

	return sorted;
});

export const totalSumSelector = createSelector(productsCartSelector, (products) => {
	return products.reduce((acc, cur) => {
		return acc + cur.price;
	}, 0);
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
/* Side effects */