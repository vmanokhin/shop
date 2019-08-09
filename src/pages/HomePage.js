import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../ducks/products';
import Page from '../layouts/Page';
import ProductList from '../components/product-list';

class HomePage extends Component {
    componentDidMount() {
        const { loadProducts, loading, loaded } = this.props;

        if (!loaded && !loading) loadProducts();
    }

    render() {
        const { products } = this.props;

        return (
            <Page>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <ProductList products={products} />
                        </div>

                        <div className="col-md-3">
                            sidebar
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default connect(({ products }) => ({
    loaded: products.loaded,
    loading: products.loading,
    products: products.entities.valueSeq().toArray()
}), { loadProducts })(HomePage);