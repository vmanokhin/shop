import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import CartRow from './cart-row';
import CartCell from './cart-cell';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		minWidth: 700,
		maxWidth: '100%'
	}
}));

function CartTable(props) {
	const { ids } = props;
	const classes = useStyles();
	const { t } = useTranslation();

	if (!ids.length) return null;

	const body = ids.map(id => <CartRow key={id} id={id} />);

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<CartCell>{t('cart.image')}</CartCell>
						<CartCell align="left">{t('cart.name')}</CartCell>
						<CartCell align="right">{t('cart.counts')}</CartCell>
						<CartCell align="right">{t('cart.price')}</CartCell>
						<CartCell align="center">{t('cart.delete')}</CartCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{body}
				</TableBody>
			</Table>
		</Paper>
	)
}

CartTable.propTypes = {
	ids: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.number, 
		PropTypes.string
	]))
};

CartTable.defaultProps = {
	ids: []
};

export default CartTable;