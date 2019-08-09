import {OrderedMap, Record} from 'immutable';
import axios from '../libs/axios';
import { appName, apiUrl } from '../config';
import { mapToOrderedMap } from '../libs/utils';


export const moduleName = 'products';
const PRODUCTS_REQUEST = `${appName}/${moduleName}/PRODUCTS_REQUEST`;
const PRODUCTS_SUCCESS = `${appName}/${moduleName}/PRODUCTS_SUCCESS`;
const PRODUCTS_FAILURE = `${appName}/${moduleName}/PRODUCTS_FAILURE`;

export const ProductModel = Record({
    id: '',
    name: '',
    image: '',
    text: ''
}, 'ProductModel');


export const ReducerRecord = Record({
    entities: new OrderedMap(),
    loading: false,
    loaded: false,
    error: null
}, 'ReducerRecord');


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS_REQUEST: {
            return state.set('loading', true);
        }

        case PRODUCTS_SUCCESS: {
            return state
                .set('loading', false)
                .set('loaded', payload.isLast)
                .set('error', null)
                .update('entities', entities => entities.merge(mapToOrderedMap(payload.entities, ProductModel)));
        }

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

export function loadProducts(offset) {
    return async dispatch => {
        dispatch({
            type: PRODUCTS_REQUEST
        });

        try {
            const url = `${apiUrl}/products/${offset ? ('?offset=' + offset) : ''}`;
            const { data } = await axios.get(url);

            dispatch({
                type: PRODUCTS_SUCCESS,
                payload: {
                    entities: data.products,
                    isLast: data.isLast
                }
            });

        } catch(_) {
            dispatch({
                type: PRODUCTS_FAILURE
            });
        }
    }
}