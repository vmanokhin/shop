import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import {
	productLengthGetter,
	loadProducts,
	productsSelector,
	moduleName as productsModuleName
} from '../ducks/products';
import Page from '../layouts/Page';
import ProductList from '../components/product/product-list';
import Loader from '../components/common/loader';
import Sidebar from '../layouts/Sidebar';


class HomePage extends Component {
	get body() {
		const { products, loading, fullLoaded, t } = this.props;

		return (
			<div className="row">
				<div className="col-md-9">
					<ProductList products={products} />

					{!fullLoaded && (
						<Button onClick={this.loadMoreHandler} disabled={loading} variant="contained" color="primary">{t('buttons.load_more')}</Button>
					)}
				</div>

				<div className="col-md-3">
					<Sidebar />
				</div>
			</div>
		)
	}
	
	loadMoreHandler = () => {
		const {
			loadProducts,
			loading,
			fullLoaded,
			productLength,
		} = this.props;

		if (!fullLoaded && !loading) loadProducts(productLength);
	};

	componentDidMount() {
		const { loadProducts, loading, loaded } = this.props;
		if (!loaded && !loading) loadProducts();
	}

	render() {
		const { loading, loaded } = this.props;

		return (
			<Page>
				<div className="container">
					{loading && !loaded ? <Loader /> : this.body}
				</div>
			</Page>
		);
	}
}

export default withTranslation()(connect(state => ({
	loaded: state[productsModuleName].loaded,
	fullLoaded: state[productsModuleName].fullLoaded,
	loading: state[productsModuleName].loading,
	products: productsSelector(state),
	productLength: productLengthGetter(state)
}), { loadProducts })(HomePage));