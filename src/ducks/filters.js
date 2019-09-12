import { Record, OrderedMap, Map } from 'immutable';
import { createSelector } from 'reselect';
import axios from '../libs/axios';
import { appName, apiUrl } from '../config';
import { mapToOrderedMap } from '../libs/utils';


/**
 *  Constants
 */
export const moduleName = 'filters';
const prefix = `${appName}/${moduleName}`;

export const PRICE_ASC = 'price_asc';
export const PRICE_DESC = 'price_desc';
export const sortProperties = [PRICE_ASC, PRICE_DESC];

const SUBMIT_SEARCH_FORM = `${prefix}/SUBMIT_SEARCH_FORM`;
const CHANGE_SORT_PROPERTY =`${prefix}/CHANGE_SORT_PROPERTY`;

const FILTERS_START = `${prefix}/FILTERS_START`;
const FILTERS_SUCCESS = `${prefix}/FILTERS_SUCCESS`;
const FILTERS_FAILURE = `${prefix}/FILTERS_FAILURE`;

const SET_CURRENT_CATEGORY = `${prefix}/SET_CURRENT_CATEGORY`;


/**
 *  Models
 */
export const CategoryModel = Record({
	id: '',
	name: ''
}, 'CategoryModel');

const ReducerRecord = Record({
	loading: false,
	categories: new OrderedMap(),
	activeCategoryId: '',
	sortProperty: PRICE_ASC,
	search: '',
	priceStart: 0,
	priceEnd: 0,
	defaults: new Map({
		priceMin: 0,
		priceMax: 0
	})
}, 'FiltersReducerRecord');


/**
 *  Reducer
 */
export default function reducer(state = new ReducerRecord(), action) {
	const { type, payload } = action;

	switch (type) {
		case SUBMIT_SEARCH_FORM: {
			return state.set('search', payload.value || '');
		}

		case CHANGE_SORT_PROPERTY: {
			return state.set('sortProperty', payload.value || PRICE_ASC);
		}

		case SET_CURRENT_CATEGORY: {
			return state.set('activeCategoryId', payload.id);
		}

		case FILTERS_START: {
			return state.set('loading', true);
		}

		case FILTERS_SUCCESS: {
			const { categories, price } = payload;

			return state
				.update('categories', cats => cats.merge(mapToOrderedMap(categories, CategoryModel)))
				.setIn(['defaults', 'priceMin'], price.min)
				.setIn(['defaults', 'priceMax'], price.max)
				.set('loading', false);
		}

		case FILTERS_FAILURE: {
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
export const productsSortProp = state => state[moduleName].sortProperty;
export const searchValueGetter = state => state[moduleName].search;
export const activeCategoryIdGetter = state => state[moduleName].activeCategoryId;
const categoriesGetter = state => state[moduleName].categories;

export const categoriesSelector = createSelector(categoriesGetter, (categories) => {
	return categories.valueSeq().toArray();
});

/**
 *  Actions
 */
export function submitSearchForm(value) {
	return {
		type: SUBMIT_SEARCH_FORM,
		payload: { value }
	}
}

export function changeSortProperty(value) {
	return {
		type: CHANGE_SORT_PROPERTY,
		payload: { value }
	}
}

export function loadFilters() {
	return async dispatch => {
		dispatch({
			type: FILTERS_START
		});

		try {
			const url = `${apiUrl}/filters/`;
			const { data } = await axios.get(url);

			dispatch({
				type: FILTERS_SUCCESS,
				payload: {
					categories: data.categories,
					price: data.price
				}
			});

		} catch (_) {
			dispatch({
				type: FILTERS_FAILURE
			});
		}
	}
}

export function setCurrentCategory(id) {
	return {
		type: SET_CURRENT_CATEGORY,
		payload: { id }
	}
}