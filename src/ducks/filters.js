import { Record } from 'immutable';
// import { createSelector } from 'reselect';
import { appName } from '../config';


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


/**
 *  Models
 */
const ReducerRecord = Record({
	sortProperty: PRICE_ASC,
	search: '',
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