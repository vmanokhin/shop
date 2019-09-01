import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import truncate from 'lodash/truncate';
import AdapterLink from '../common/adapter-link';
import { addToCart } from '../../ducks/cart';
import { ProductModel, PRODUCT } from '../../ducks/products';

const useStyles = makeStyles(theme => ({
  name: {
		color: theme.palette.common.black,
		'&:hover': {
			color: theme.palette.common.black,
			textDecoration: 'none'
		}
	},
}));


function ProductCard(props) {
	const { product, addToCart } = props;

	const spec = {
		item: {
			id: product.id,
			type: PRODUCT
		},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
	};

	const classes = useStyles();
	const [{ isDragging }, drag, preview] = useDrag(spec);

	const { image, name, text, id } = product;
	const truncatedText = truncate(text, {
		length: 60,
		omission: '...'
	});

	const opacity = isDragging ? 0.8 : 1;
	
	return (
		<>
			<DragPreviewImage connect={preview} src={name} />
			<Card style={{ opacity }}>
				<div ref={drag}>
					<CardMedia
						image={image}
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography className={classes.name}  gutterBottom variant="h5" component={AdapterLink} to={`/product/${id}/`}>
							{name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{truncatedText}
						</Typography>
					</CardContent>
				</div>
				<CardActions>
					<Button variant="contained" size="small" color="primary" onClick={addToCart}>Buy</Button>
					<Button size="small" color="primary" component={AdapterLink} to={`/product/${id}/`}>More info</Button>
				</CardActions>
			</Card>
		</>
	);
}

ProductCard.propTypes = {
	addToCart: PropTypes.func.isRequired,
	product: PropTypes.instanceOf(ProductModel)
};

export default connect(null, (dispatch, ownProps) => ({
	addToCart: () => dispatch(addToCart(ownProps.product.id))
}))(ProductCard);