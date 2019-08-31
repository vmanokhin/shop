import { OrderedMap, Record } from 'immutable';
import { createSelector } from 'reselect';
import axios from '../libs/axios';
import { appName, apiUrl } from '../config';
import { mapToOrderedMap } from '../libs/utils';


export const moduleName = 'products';
const prefix = `${appName}/${moduleName}`;

const PRODUCTS_REQUEST = `${prefix}/PRODUCTS_REQUEST`;
const PRODUCTS_SUCCESS = `${prefix}/PRODUCTS_SUCCESS`;
const PRODUCTS_FAILURE = `${prefix}/PRODUCTS_FAILURE`;

const PRODUCT_BY_ID_REQUEST = `${prefix}/PRODUCT_BY_ID_REQUEST`;
const PRODUCT_BY_ID_SUCCESS = `${prefix}/PRODUCT_BY_ID_SUCCESS`;
const PRODUCT_BY_ID_FAILURE = `${prefix}/PRODUCT_BY_ID_FAILURE`;

const CATEGORIES_SUCCESS = `${prefix}/CATEGORIES_SUCCESS`;
const CATEGORIES_FAILURE = `${prefix}/CATEGORIES_FAILURE`;
const SET_CURRENT_CATEGORY = `${prefix}/SET_CURRENT_CATEGORY`;

const SUBMIT_SEARCH_FORM = `${prefix}/SUBMIT_SEARCH_FORM`;


const ProductModel = Record({
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

const CategoryModel = Record({
    id: '',
    name: ''
}, 'CategoryModel');

const ReducerRecord = Record({
    loadingCategories: false,
    search: '',
    activeCategoryId: '',
    categories: new OrderedMap(),
    entities: new OrderedMap(),
    sortProperty: 'price',
    loading: false,
    loaded: false,
    fullLoaded: true,
    error: false
}, 'ProductsReducerRecord');


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS_REQUEST:
        case PRODUCT_BY_ID_REQUEST: {
            return state.set('loading', true);
        }

        case PRODUCT_BY_ID_SUCCESS: {
            const { product } = payload;

            if (product && product.id) {
                return state
                    .set('loading', false)
                    .update('entities', entities => entities.set(product.id, ProductModel(product)));
            } else {
                return state;
            }
        }

        case PRODUCTS_SUCCESS: {
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('fullLoaded', payload.isLast)
                .set('error', false)
                .update('entities', entities => entities.merge(mapToOrderedMap(payload.entities, ProductModel)));
        }

        case CATEGORIES_SUCCESS: {
            return state.update('categories', categories => categories.merge(mapToOrderedMap(payload.categories, CategoryModel)))
        }

        case SET_CURRENT_CATEGORY: {
            return state.set('activeCategoryId', payload.id);
        }

        case CATEGORIES_FAILURE:
        case PRODUCT_BY_ID_FAILURE:
        case PRODUCTS_FAILURE: {
            return state
                .set('loading', false)
                .set('error', true);
        }

        case SUBMIT_SEARCH_FORM: {
            return state.set('search', payload.value || '');
        }

        default: {
            return state;
        }
    }
}

/* Selectors */
export const productsGetter = state => state[moduleName].entities;
const productsSortProp = state => state[moduleName].sortProperty;
const activeCategoryIdGetter = state => state[moduleName].activeCategoryId;
const searchValueGetter = state => state[moduleName].search;
export const productLengthGetter = state => state[moduleName].entities.size;
const productIdGetter = (_, id) => id;
const categoriesGetter = state => state[moduleName].categories;
const sumIdsGetter = (_, ids) => ids || [];

export const productsSelector = createSelector([
    productsGetter,
    productsSortProp,
    activeCategoryIdGetter,
    searchValueGetter
], (items, sortProperty, activeCategoryId, search) => {

    let result = items.sortBy((item) => item[sortProperty]);

    //filter by active category
    if (activeCategoryId) {
        result = result.filter((item) => item.categoryId === activeCategoryId);
    }

    //filter by search
    result = result.filter((item) => item.name.toLowerCase && item.name.toLowerCase().includes(search.toLowerCase()));

    return result.valueSeq().toArray();
});

export const productByIdSelector = createSelector(productsGetter, productIdGetter, (items, id) => {
    if (id && items.has(id)) return items.get(id);
});

export const categoriesSelector = createSelector(categoriesGetter, (categories) => {
    return categories.valueSeq().toArray();
});

export const sumProductsSelector = createSelector(productsGetter, sumIdsGetter, (products, ids) => {
	if (!ids.reduce) return 0;

	return ids.reduce((acc, cur) => {
		if (products.has(cur)) {
			const product = products.get(cur);
			return acc + parseInt(product.price, 10);
		}

		return acc;
	}, 0);
});

/* Side effects */
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

export function loadCategories() {
    return async dispatch => {
        try {
            const url = `${apiUrl}/categories/`;
            const { data } = await axios.get(url);

            dispatch({
                type: CATEGORIES_SUCCESS,
                payload: {
                    categories: data.categories
                }
            });

        } catch (_) {
            dispatch({
                type: CATEGORIES_FAILURE
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

export function submitSearchForm(value) {
    return {
        type: SUBMIT_SEARCH_FORM,
        payload: { value }
    }
}