import { createSelector } from 'reselect';
import { 
	PRICE_ASC,
	PRICE_DESC,
	productsSortProp,
	searchValueGetter
} from '../ducks/filters';
import {
	productsGetter,
	productsSelector
} from '../ducks/products';
import { idsArraySelector } from '../ducks/cart';


export const productsFilteredSelector = createSelector(
	productsSortProp, 
	searchValueGetter, 
	productsSelector,
	(sortProp, search, products) => {
		let result;
		
		switch (sortProp) {
			case PRICE_ASC: {
				result = products.sort((a, b) => a.price - b.price);
				break;
			}
			case PRICE_DESC: {
				result = products.sort((a, b) => b.price - a.price);
				break;
			}

			default: {
				result = products;
			}
		}
		
		result = result.filter((item) => item.name.toLowerCase && item.name.toLowerCase().includes(search.toLowerCase()));
		
		return result.valueSeq().toArray();
	}
);

export const sumProductsSelector = createSelector(productsGetter, idsArraySelector, (products, ids) => {
	if (!ids.reduce) return 0;

	return ids.reduce((acc, cur) => {
		if (products.has(cur)) {
			const product = products.get(cur);
			return acc + parseInt(product.price, 10);
		}

		return acc;
	}, 0);
});