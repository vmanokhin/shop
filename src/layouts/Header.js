import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BasketIcon from '../components/cart/basket-icon';
import AccountIcon from '../components/auth/account-icon';
import AdapterLink from '../components/common/adapter-link';
import Search from '../components/common/search';
import LanguageChanger from '../components/common/language-changer';
import { submitSearchForm } from '../ducks/products';


const useStyles = makeStyles(theme => ({
	aside: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: 'auto'
	},
	logoLink: {
		color: '#fff',
		'&:hover': {
			color: '#fff',
			textDecoration: 'none'
		}
	}
}));

function Header(props) {
	const classes = useStyles();

	return (
		<AppBar position="sticky">
			<div className="container">
				<Toolbar variant="dense">
					<Typography className={classes.logoLink} variant="h5" color="inherit" component={AdapterLink} to="/">SHOP</Typography>

					<div className={classes.aside}>
						<Search submit={props.submitSearchForm} />
						<BasketIcon />
						<AccountIcon />
						<LanguageChanger />
					</div>
				</Toolbar>
			</div>
		</AppBar>
	);
}

export default connect(null, {
	submitSearchForm
})(Header);