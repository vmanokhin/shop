import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	loadFilters, 
	categoriesSelector,
	moduleName 
} from '../ducks/filters';
import CategoryList from '../components/filters/category-list';
import CartDropTarget from '../components/cart/cart-drop-target';


class Sidebar extends Component {
	componentDidMount() {
		const { loadFilters, loading, categories } = this.props;
		if (!loading && !categories.length) loadFilters();
	}

	render() {
		const { loading, categories } = this.props;

		return (
			<div>
				<CartDropTarget />
				{!loading && categories.length && <CategoryList categories={categories} />}
			</div>
		)
	}
}

export default connect(state => ({
	loading: state[moduleName].loading,
	categories: categoriesSelector(state)
}), { loadFilters })(Sidebar);