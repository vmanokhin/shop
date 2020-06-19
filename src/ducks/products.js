import { OrderedMap, Record } from 'immutable';
import { createSelector } from 'reselect';
import isUndefined from "lodash/isUndefined";
import axios from '../libs/axios';
import { appName, apiUrl } from '../config';
import { mapToOrderedMap } from '../libs/utils';


/**
 *  Constants
 */
export const moduleName = 'products';
const prefix = `${appName}/${moduleName}`;

export const PRODUCT = `${prefix}/PRODUCT`;
const PRODUCTS_REQUEST = `${prefix}/PRODUCTS_REQUEST`;
const PRODUCTS_SUCCESS = `${prefix}/PRODUCTS_SUCCESS`;
const PRODUCTS_FAILURE = `${prefix}/PRODUCTS_FAILURE`;

const PRODUCT_BY_ID_REQUEST = `${prefix}/PRODUCT_BY_ID_REQUEST`;
const PRODUCT_BY_ID_SUCCESS = `${prefix}/PRODUCT_BY_ID_SUCCESS`;
const PRODUCT_BY_ID_FAILURE = `${prefix}/PRODUCT_BY_ID_FAILURE`;


/**
 *  Models
 */
export const ProductModel = Record({
	id: '',
	name: '',
	image: '',
	text: '',
	color: '',
	price: 0,
	material: '',
	categoryId: '',
	company: ''
}, 'ProductModel');

const ReducerRecord = Record({
	entities: new OrderedMap(),
	loading: false,
	loaded: true,
	error: false
}, 'ProductsReducerRecord');


/**
 *  Reducer
 */
export default function reducer(state = new ReducerRecord(), action) {
	const { type, payload } = action;

	switch (type) {
		case PRODUCTS_REQUEST:
		case PRODUCT_BY_ID_REQUEST: {
			return state.set('loading', true);
		}

		case PRODUCT_BY_ID_SUCCESS: {
			const { product } = payload;

			if (product && !isUndefined(product.id)) {
				return state
					.set('loading', false)
					.setIn(['entities', product.id], new ProductModel(product));
			} else {
				return state;
			}
		}

		case PRODUCTS_SUCCESS: {
			const { isLast, entities } = payload;

			return state
				.set('loading', false)
				.set('loaded', !!isLast)
				.set('error', false)
				.mergeIn(['entities'], mapToOrderedMap(entities, ProductModel));
		}

		case PRODUCT_BY_ID_FAILURE:
		case PRODUCTS_FAILURE: {
			return state
				.set('loading', false)
				.set('error', true);
		}

		default: {
			return state;
		}
	}
}


/**
 *  Selectors
 */
export const productsGetter = state => state[moduleName].entities;
export const productLengthGetter = state => state[moduleName].entities.size;
const productIdGetter = (_, id) => id;

export const productsSelector = createSelector(productsGetter, (items) => items);

export const productByIdSelector = createSelector(productsGetter, productIdGetter, (items, id) => {
	if (id && items.has(id)) return items.get(id);
});


/**
 *  Actions
 */
export function loadProducts(offset) {
	return async dispatch => {
		dispatch({
			type: PRODUCTS_REQUEST
		});

		try {
			const url = `${apiUrl}/products/${offset ? ('?offset=' + offset) : ''}`;
			const { data } = await axios.get(url);

			if (!data) return;

			dispatch({
				type: PRODUCTS_SUCCESS,
				payload: {
					entities: data.products,
					isLast: data.isLast
				}
			});

		} catch (_) {
			dispatch({
				type: PRODUCTS_FAILURE
			});
		}
	}
}

export function loadProductById(id) {
	return async dispatch => {
		if (!id) return;

		dispatch({
			type: PRODUCT_BY_ID_REQUEST
		});

		try {
			const url = `${apiUrl}/products/${id}`;
			const { data } = await axios.get(url);

			if (!data) return;

			dispatch({
				type: PRODUCT_BY_ID_SUCCESS,
				payload: {
					product: data.product
				}
			});

		} catch (_) {
			dispatch({
				type: PRODUCT_BY_ID_FAILURE
			});
		}
	}
}