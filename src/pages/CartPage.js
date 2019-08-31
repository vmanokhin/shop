import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Page from '../layouts/Page';
import AdapterLink from '../components/adapter-link';
import CartTable from '../components/cart-table';
import CartNav from '../components/cart-nav';
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

		const sumText = <Typography paragraph variant="h5" align="right">Total sum: {sum} $</Typography>;

		const body = !products.length ? fallback : (
			<>
				<CartTable items={products} />
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

export default connect(state => ({
		sum: totalSumSelector(state),
    products: productsCartNormalized(state)
}))(CartPage);