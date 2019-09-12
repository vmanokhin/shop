import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Page from '../layouts/Page';
import AdapterLink from '../components/common/adapter-link';
import CartTable from '../components/cart/cart-table';
import CartNav from '../components/cart/cart-nav';
import { uniqIdsSelector, idsArraySelector } from '../ducks/cart';
import { sumProductsSelector } from '../redux/common-selectors';


function CartPage(props) {
	const { t } = useTranslation();
	const { productsIds, sum } = props;

	const fallback = (
		<Typography paragraph variant="h4">
			<span>{t('cart.cart_empty')}</span>

			<Button variant="contained" color="secondary" component={AdapterLink} to="/">
				{t('buttons.catalog')}
      </Button>
		</Typography>
	);

	const sumText = <Typography paragraph variant="h5" align="right">{t('cart.total_sum')} {sum} $</Typography>;

	const body = !productsIds.length ? fallback : (
		<>
			<CartTable ids={productsIds} />
			{sumText}
			<CartNav />
		</>
	);

	return (
		<Page>
			<div className="container">
				{body}
			</div>
		</Page>
	);
}

CartPage.propTypes = {
	sum: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	productsIds: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]))
}

export default connect(state => {
	const ids = idsArraySelector(state);

	return ({
		productsIds: uniqIdsSelector(state),
		sum: sumProductsSelector(state, ids),
	})
})(CartPage);