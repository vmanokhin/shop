import React from 'react';
import { connect } from 'react-redux';
import { productByIdSelector } from '../../ducks/products'; 


function ProductDragPreview(props) {
	const { name } = props.product;

	return (
		<h2>
			{name}
		</h2>
	)
}

export default connect((state, ownProps) => ({
	product: productByIdSelector(state, ownProps.id)
}))(ProductDragPreview);