import React from 'react';
import { connect } from 'react-redux';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { cartSizeGetter } from '../ducks/cart';


function BasketIcon(props) {
    const { counts } = props;
    const label = counts ? `Show ${counts} product` : 'The cart is empty';
    const cartIsEmpty = !Boolean(counts);

    return (
        <IconButton aria-label={label} color="inherit">
            <Badge badgeContent={counts} invisible={cartIsEmpty} color="secondary">
                <ShoppingBasket />
            </Badge>
        </IconButton>
    );
}

export default connect(state => ({
    counts: cartSizeGetter(state)
}))(BasketIcon);