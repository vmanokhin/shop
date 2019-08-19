import React from 'react';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';


function BasketIcon() {
    return (
        <IconButton aria-label="show 4 product" color="inherit">
            <Badge badgeContent={"0"} color="secondary">
                <ShoppingBasket />
            </Badge>
        </IconButton>
    );
}

export default BasketIcon;