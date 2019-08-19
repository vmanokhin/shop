import { OrderedMap, Record } from 'immutable';
import { createSelector } from 'reselect';
import axios from '../libs/axios';
import { appName, apiUrl } from '../config';
import { mapToOrderedMap } from '../libs/utils';


export const moduleName = 'products';
const PRODUCTS_REQUEST = `${appName}/${moduleName}/PRODUCTS_REQUEST`;
const PRODUCTS_SUCCESS = `${appName}/${moduleName}/PRODUCTS_SUCCESS`;
const PRODUCTS_FAILURE = `${appName}/${moduleName}/PRODUCTS_FAILURE`;

const PRODUCT_BY_ID_REQUEST = `${appName}/${moduleName}/PRODUCT_BY_ID_REQUEST`;
const PRODUCT_BY_ID_SUCCESS = `${appName}/${moduleName}/PRODUCT_BY_ID_SUCCESS`;
const PRODUCT_BY_ID_FAILURE = `${appName}/${moduleName}/PRODUCT_BY_ID_FAILURE`;

const CATEGORIES_SUCCESS = `${appName}/${moduleName}/CATEGORIES_SUCCESS`;
const CATEGORIES_FAILURE = `${appName}/${moduleName}/CATEGORIES_FAILURE`;
const SET_CURRENT_CATEGORY = `${appName}/${moduleName}/SET_CURRENT_CATEGORY`;

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
}, 'CategoryModel   ');

const ReducerRecord = Record({
    loadingCategories: false,
    activeCategoryId: '',
    categories: new OrderedMap(),
    entities: new OrderedMap(),
    sortProperty: 'price',
    loading: false,
    loaded: false,
    fullLoaded: true,
    error: false
}, 'ReducerRecord');


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
                return  state;
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

        default: {
            return state;
        }
    }
}

/* Selectors */
const productsGetter = state => state.products.entities;
const productsSortProp = state => state.products.sortProperty;
const activeCategoryIdGetter = state => state.products.activeCategoryId;
export const productsSelector = createSelector(productsGetter, productsSortProp, activeCategoryIdGetter, (items, sortProperty, activeCategoryId) => {
   let result = items.sortBy((item) => item[sortProperty]);

   if (activeCategoryId) {
       result = result.filter((item) => item.categoryId === activeCategoryId);
   }

   return result.valueSeq().toArray();
});

const productIdGetter = (_, ownProps) => ownProps.match.params.id;
export const productByIdSelector = createSelector(productsGetter, productIdGetter, (items, id) => {
   if (id && items.has(id)) return items.get(id);
});

const categoriesGetter = state => state.products.categories;
export const categoriesSelector = createSelector(categoriesGetter, (categories) => {
    return categories.valueSeq().toArray();
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

        } catch(_) {
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

        } catch(_) {
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

        } catch(_) {
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