import { Record } from 'immutable';
// import { createSelector } from 'reselect';
import { appName } from '../config';


/**
 *  Constants
 */
export const moduleName = 'filters';
const prefix = `${appName}/${moduleName}`;

const PRICE = 'PRICE';
const SUBMIT_SEARCH_FORM = `${prefix}/SUBMIT_SEARCH_FORM`;

/**
 *  Models
 */
const ReducerRecord = Record({
	sortProperty: PRICE,
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

}