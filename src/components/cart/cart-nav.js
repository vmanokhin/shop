import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { clearCart } = props;

	function clearCartHandler() {
		clearCart();
		
		enqueueSnackbar(t('cart.cart_cleaned'), {
			variant: 'success'
		});
	}

	return (
		<div className={classes.root}>
			<Button className={classes.button} size="medium" variant="outlined" color="primary" onClick={clearCartHandler}>{t('buttons.clear_cart')}</Button>
			<Button className={classes.button} size="medium" variant="contained" color="secondary">{t('buttons.checkout')}</Button>
		</div>
	)
}

CartNav.propTypes = {
	clearCart: PropTypes.func.isRequired
};

export default connect(null, {
	clearCart
})(CartNav);