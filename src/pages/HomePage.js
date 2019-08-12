import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { loadProducts, productsSelector } from '../ducks/products';
import Page from '../layouts/Page';
import ProductList from '../components/product-list';

class HomePage extends Component {
    loadMoreHandler = () => {
        const { loadProducts, loading, loaded, products } = this.props;

        if (!loaded && !loading) loadProducts(products.length);
    };

    componentDidMount() {
        const { loadProducts, loading, loaded } = this.props;

        if (!loaded && !loading) loadProducts();
    }

    render() {
        const { products, loading, loaded } = this.props;

        return (
            <Page>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <ProductList products={products} />

                            {!loaded && <Button onClick={this.loadMoreHandler} disabled={loading} variant="contained" color="primary">Load more</Button>}
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

export default connect(state => ({
    loaded: state.products.loaded,
    loading: state.products.loading,
    products: productsSelector(state)
}), { loadProducts })(HomePage);