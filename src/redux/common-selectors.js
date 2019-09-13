import { createSelector } from 'reselect';
import { 
	PRICE_ASC,
	PRICE_DESC,
	productsSortProp,
	searchValueGetter,
	activeCategoryIdGetter,
	priceStartGetter,
	priceEndGetter,
} from '../ducks/filters';
import {
	productsGetter,
	productsSelector
} from '../ducks/products';
import { idsArraySelector } from '../ducks/cart';


export const productsFilteredSelector = createSelector(
	productsSortProp, 
	searchValueGetter, 
	activeCategoryIdGetter,
	priceStartGetter,
	priceEndGetter,
	productsSelector,
	(sortProp, search, categoryId, priceStart, priceEnd, products) => {
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

		result = result.filter(item => {
			const { price, name } = item;
			//filter by active category
			if (categoryId && item.categoryId !== categoryId) return false;

			//filter by price
			if (priceStart || priceEnd) {
				if (price < priceStart || (priceEnd && price > priceEnd)) return false;
			}

			//filter by active search
			if (name.toLowerCase && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
			
			return true;
		});

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