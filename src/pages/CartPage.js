import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Page from '../layouts/Page';
import AdapterLink from '../components/adapter-link';
import CartTable from '../components/cart-table';
import { productsCartNormalized, totalSumSelector } from '../ducks/cart';


function CartPage(props) {
    const { products, sum } = props;

    const fallback = (
        <Typography paragraph variant="h4">
            <span>Cart is empty. Will back to the </span>
            
            <Button variant="contained" color="secondary" component={AdapterLink} to="/">
                Catalog
            </Button>
        </Typography>
    );

		const sumText = products.length && sum
		? <Typography paragraph variant="h4" align="right">{sum} $</Typography>
		: null; 

    return (
        <Page>
            <div className="container">
                {!products.length && fallback}
                <CartTable items={products} />
								{sumText}
            </div>
        </Page>
    );
}

export default connect(state => ({
		sum: totalSumSelector(state),
    products: productsCartNormalized(state)
}))(CartPage);