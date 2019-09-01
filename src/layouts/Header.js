import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BasketIcon from '../components/cart/basket-icon';
import AccountIcon from '../components/auth/account-icon';
import Search from '../components/common/search';
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
					<Typography variant="h5" color="inherit">
						<Link className={classes.logoLink} to="/">SHOP</Link>
					</Typography>

					<div className={classes.aside}>
						<Search submit={props.submitSearchForm} />
						<BasketIcon />
						<AccountIcon />
					</div>
				</Toolbar>
			</div>
		</AppBar>
	);
}

export default connect(null, {
	submitSearchForm
})(Header);