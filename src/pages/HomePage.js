import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { loadProducts, productsSelector } from '../ducks/products';
import Page from '../layouts/Page';
import ProductList from '../components/product-list';
import Loader from '../components/loader';

class HomePage extends Component {
    loadMoreHandler = () => {
        const { loadProducts, loading, fullLoaded, products } = this.props;

        if (!fullLoaded && !loading) loadProducts(products.length);
    };

    get body() {
        const { products, loading, fullLoaded } = this.props;

        return (
            <div className="row">
                <div className="col-md-9">
                    <ProductList products={products} />

                    {!fullLoaded && <Button onClick={this.loadMoreHandler} disabled={loading} variant="contained" color="primary">Load more</Button>}
                </div>

                <div className="col-md-3">
                    sidebar
                </div>
            </div>
        )
    }

    componentDidMount() {
        const { loadProducts, loading, loaded } = this.props;

        if (!loaded && !loading) loadProducts();
    }

    render() {
        const { loading, loaded } = this.props;

        return (
            <Page>
                <div className="container">
                    { loading && !loaded ? <Loader /> : this.body }
                </div>
            </Page>
        );
    }
}

export default connect(state => ({
    loaded: state.products.loaded,
    fullLoaded: state.products.fullLoaded,
    loading: state.products.loading,
    products: productsSelector(state)
}), { loadProducts })(HomePage);