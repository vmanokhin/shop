import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import productsReducer, { moduleName as productsModule } from '../ducks/products';
import cartReducer, { moduleName as cartModule } from '../ducks/cart';

export default combineReducers({
    form,
    [productsModule]: productsReducer,
    [cartModule]: cartReducer
});