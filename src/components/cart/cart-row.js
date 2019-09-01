import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AdapterLink from '../common/adapter-link';
import Counter from '../common/counter';
import CartCell from './cart-cell';
import {
	deleteProduct,
	decrementProduct,
	incrementProduct,
	countByIdSelector
} from '../../ducks/cart';
import { productByIdSelector, ProductModel } from '../../ducks/products';


const styles = theme => ({
	imageCell: {
		width: theme.spacing(21)
	},
	image: {
		maxWidth: '100%'
	},
	link: {
		color: theme.palette.common.black,
		'&:hover': {
			color: theme.palette.common.black,
			textDecoration: 'none'
		}
	}
});

class CartRow extends Component {
	static propTypes = {
		deleteProduct: PropTypes.func.isRequired,
		incrementProduct: PropTypes.func.isRequired,
		decrementProduct: PropTypes.func.isRequired,
		count: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
		product: PropTypes.instanceOf(ProductModel).isRequired
	};

	static defaultProps = {
		product: new ProductModel()
	};

	deleteHandlerClick = () => {
		const { deleteProduct, id } = this.props;
		deleteProduct(id);
	};

	incrementHandlerClick = () => {
		const { incrementProduct, id } = this.props;
		incrementProduct(id);
	};

	decrementHandlerClick = () => {
		const { decrementProduct, id } = this.props;
		decrementProduct(id);
	};

	render() {
		const { product, id, count, classes } = this.props;
		const { name, image, price } = product;
		const sum = parseInt(price, 10) * count;

		return (
			<TableRow key={id}>
				<CartCell scope="row" className={classes.imageCell}>
					<Link to={`/product/${id}`}>
						<img className={classes.image} src={image} alt="" />
					</Link>
				</CartCell>

				<CartCell>
					<Typography className={classes.link} variant="h5" component={AdapterLink} to={`/product/${id}`}>
						{name}
					</Typography>
				</CartCell>

				<CartCell align="right">
					<Typography variant="h6">
						<Counter
							increment={this.incrementHandlerClick}
							decrement={this.decrementHandlerClick}
							count={count}
						/>
					</Typography>
				</CartCell>

				<CartCell align="right">
					<Typography variant="h5">
						{sum} $
					</Typography>
				</CartCell>

				<CartCell align="center">
					<IconButton color="inherit" onClick={this.deleteHandlerClick}>
						<DeleteOutlineIcon />
					</IconButton>
				</CartCell>
			</TableRow>
		)
	}
}

export default connect((state, ownProps) => ({
	product: productByIdSelector(state, ownProps.id),
	count: countByIdSelector(state, ownProps)
}), ({
	deleteProduct,
	incrementProduct,
	decrementProduct
}))(withStyles(styles)(CartRow));