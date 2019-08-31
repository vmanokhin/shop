import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { sizeGetter } from '../ducks/cart';

const useStyles = makeStyles(() => ({
    basketLink: {
        '&:hover': {
            color: 'inherit'
        }
    }
}));

function BasketIcon(props) {
    const { counts } = props;
    const classes = useStyles();
    const label = counts ? `Show ${counts} product` : 'The cart is empty';
    const cartIsEmpty = !Boolean(counts);

    const BasketLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    return (
        <IconButton 
            className={classes.basketLink} 
            aria-label={label} 
            color="inherit" 
            to="/cart/" 
            component={BasketLink}
        >
            <Badge badgeContent={counts} invisible={cartIsEmpty} color="secondary">
                <ShoppingBasket />
            </Badge>
        </IconButton>
    );
}

export default connect(state => ({
    counts: sizeGetter(state)
}))(BasketIcon);