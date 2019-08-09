import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import productsReducer, { moduleName as productsModule } from '../ducks/products';

export default combineReducers({
    form,
    [productsModule]: productsReducer
});