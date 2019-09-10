import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import { PRODUCT } from '../../ducks/products';
import { addToCart } from '../../ducks/cart';


function CartDropTarget(props) {
	const { enqueueSnackbar } = useSnackbar();
	const { theme, addToCart } = props;
	
	const spec = {
		accept: PRODUCT,
		drop: ({ id, name }) => {
			if (id) {
				addToCart(id);
				enqueueSnackbar(<span>Product <b>{name}</b> added to cart!</span>, {
					variant: 'success'
				});
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
	};
	
	const [{ canDrop, isOver }, drop] = useDrop(spec);

	const isActive = canDrop && isOver;
	let backgroundColor = theme.palette.primary.light;
	let borderColor = theme.palette.grey[400];

	if (isActive) {
		backgroundColor = theme.palette.secondary.light;
		borderColor = theme.palette.common.white;
	} else if (canDrop) {
		backgroundColor = theme.palette.primary.dark;
	}

	const styles = {
		root: {
			padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
			textAlign: 'center',
			color: theme.palette.common.white,
			borderWidth: '3px',
			borderStyle: 'dashed',
			borderColor,
			backgroundColor
		}
	};

	return (
		<Paper ref={drop} style={{ ...styles.root }}>
			Drop a product here!
		</Paper>
	)
}

CartDropTarget.propTypes = {
	addToCart: PropTypes.func.isRequired
};

export default connect(null, {
	addToCart
})(withTheme(CartDropTarget));