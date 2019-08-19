import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import BasketIcon from '../components/basket-icon';
import AccountIcon from '../components/account-icon';
import Search from '../components/search';


const useStyles = makeStyles(theme => ({
    aside: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    }
}));


function Header() {
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <div className="container">
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit">
                        SHOP
                    </Typography>

                    <div className={classes.aside}>
                        <Search />
                        <BasketIcon />
                        <AccountIcon />
                    </div>
                </Toolbar>
            </div>
        </AppBar>
    );
}

export default Header;