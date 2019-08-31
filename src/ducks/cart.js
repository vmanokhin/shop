import { List, Record } from 'immutable';
import { createSelector } from 'reselect';
// import axios from '../libs/axios';
import { appName, /*apiUrl*/ } from '../config';
import { productsGetter } from './products';
import groupBy from 'lodash/groupBy';
import lodashMap from 'lodash/map';


const ReducerRecord = Record({
    ids: List()
}, 'ReducerRecord');

export const moduleName = 'cart';
const prefix = `${appName}/${moduleName}`;

const ADD_TO_CART = `${prefix}/ADD_TO_CART`;
// const LOAD_SAVED_IDS_SUCCESS = `${prefix}/LOAD_SAVED_IDS_SUCCESS`;
// const LOAD_SAVED_IDS_FAILURE = `${prefix}/LOAD_SAVED_IDS_FAILURE`;


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch(type) {
        case ADD_TO_CART: {
            return state.mergeIn(['ids'], payload.id);
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

	return normalized;
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

/* Side effects */
// export function loadIdsFromStorage() {
//     return dispatch => {
        
//     }
// }