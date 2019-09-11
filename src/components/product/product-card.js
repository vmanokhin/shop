import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import truncate from 'lodash/truncate';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const { product, addToCart } = props;

	const spec = {
		item: {
			id: product.id,
			name: product.name,
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

	useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  });

	function addToCartHandler() {
		addToCart(id);
		enqueueSnackbar && enqueueSnackbar(<span>{t('product.product_added', { product: product.name })}</span>, {
			variant: 'success'
		});
	}

	return (
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
				<Button variant="contained" size="small" color="primary" onClick={addToCartHandler}>{t('buttons.buy')}</Button>
				<Button size="small" color="primary" component={AdapterLink} to={`/product/${id}/`}>{t('buttons.more_info')}</Button>
			</CardActions>
		</Card>
	);
}

ProductCard.propTypes = {
	addToCart: PropTypes.func.isRequired,
	product: PropTypes.instanceOf(ProductModel)
};

export default connect(null, ({
	addToCart
}))(ProductCard);