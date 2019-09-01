import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategories, categoriesSelector } from '../ducks/products';
import CategoryList from '../components/product/category-list';
import CartDropTarget from '../components/cart/cart-drop-target';


class Sidebar extends Component {
	componentDidMount() {
		const { loadCategories, loadingCategories, categories } = this.props;
		if (!loadingCategories && !categories.length) loadCategories();
	}

	render() {
		const { loadingCategories, categories } = this.props;

		return (
			<div>
				<CartDropTarget />
				{!loadingCategories && categories.length && <CategoryList categories={categories} />}
			</div>
		)
	}
}

export default connect(state => ({
	loadingCategories: state.products.loadCategories,
	categories: categoriesSelector(state)
}), { loadCategories })(Sidebar);