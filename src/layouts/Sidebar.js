import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadCategories, categoriesSelector } from '../ducks/products';
import CategoryList from '../components/category-list';

class Sidebar extends Component {
    componentDidMount() {
        const { loadCategories, loadingCategories, categories } = this.props;

        if (!loadingCategories && !categories.length) loadCategories();
    }

    render() {
        const { loadingCategories, categories } = this.props;

        return (
            <div>
                {!loadingCategories && categories.length && <CategoryList categories={categories} />}
            </div>
        )
    }
}

export default connect(state => ({
    loadingCategories: state.products.loadCategories,
    categories: categoriesSelector(state)
}), { loadCategories })(Sidebar);