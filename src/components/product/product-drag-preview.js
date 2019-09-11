import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { productByIdSelector, ProductModel } from '../../ducks/products'; 


function ProductDragPreview(props) {
	const { name } = props.product;

	return (
		<h2>
			{name}
		</h2>
	)
}

ProductDragPreview.propTypes = {
	product: PropTypes.instanceOf(ProductModel)
};

export default connect((state, ownProps) => ({
	product: productByIdSelector(state, ownProps.id)
}))(ProductDragPreview);