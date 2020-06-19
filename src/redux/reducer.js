import { combineReducers } from 'redux';
import productsReducer, { moduleName as productsModule } from '../ducks/products';
import cartReducer, { moduleName as cartModule } from '../ducks/cart';
import filtersReducer, { moduleName as filtersModule } from '../ducks/filters';

export default combineReducers({
	[productsModule]: productsReducer,
	[cartModule]: cartReducer,
	[filtersModule]: filtersReducer
});