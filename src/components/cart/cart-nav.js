import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { clearCart } from '../../ducks/cart';


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(4)
	},
	button: {
		marginLeft: theme.spacing(2)
	}
}));

function CartNav(props) {
	const classes = useStyles();
	const { clearCart } = props;

	return (
		<div className={classes.root}>
			<Button className={classes.button} size="medium" variant="outlined" color="primary" onClick={clearCart}>Clear cart</Button>
			<Button className={classes.button} size="medium" variant="contained" color="secondary">Checkout</Button>
		</div>
	)
}

CartNav.propTypes = {
	clearCart: PropTypes.func.isRequired
};

export default connect(null, {
	clearCart
})(CartNav);