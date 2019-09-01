import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ProductCard from './product-card';
import { ProductModel } from '../../ducks/products';


function ProductList(props) {
	const { products } = props;

	const productsElements = products.map(product => (
		<div key={product.id} className="col-md-4">
			<ProductCard product={product} />
		</div>
	));

	const FallbackComponent = !products.length && (
		<div className="col-12">
			<Typography paragraph variant="h4" component="h2">
				Not found products for the current filter
      </Typography>
		</div>
	);

	return (
		<div className="row">
			{FallbackComponent}
			{productsElements}
		</div>
	);
}

ProductList.propTypes = {
	products: PropTypes.arrayOf(PropTypes.instanceOf(ProductModel))
};

export default ProductList;