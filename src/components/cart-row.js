import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AdapterLink from './adapter-link';
import CartCell from './cart-cell';
import Counter from './counter';
import { deleteProduct, decrementProduct, incrementProduct } from '../ducks/cart';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
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
}));


function CartRow(props) {
	const classes = useStyles();

	const { 
		entities, 
		id, 
		deleteProduct, 
		incrementProduct, 
		decrementProduct
	} = props;
	
	const { name, image } = entities[0];
	const sum = entities.reduce((acc, cur) => acc + parseInt(cur.price), 0);

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
						increment={incrementProduct}
						decrement={decrementProduct}
						count={entities.length} 
					/>
				</Typography>
			</CartCell>

			<CartCell align="right">
				<Typography variant="h5">
					{sum} $
				</Typography>
			</CartCell>

			<CartCell align="center">
				<IconButton color="inherit" onClick={deleteProduct}>
					<DeleteOutlineIcon />
				</IconButton>
			</CartCell>
		</TableRow>
	)
}

export default connect(null, (dispatch, ownProps) => ({
    deleteProduct: () => dispatch(deleteProduct(ownProps.id)),
    incrementProduct: () => dispatch(incrementProduct(ownProps.id)),
    decrementProduct: () => dispatch(decrementProduct(ownProps.id)),
}))(CartRow);