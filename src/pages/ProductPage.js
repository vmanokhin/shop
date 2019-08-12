import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { loadProductById, productByIdSelector } from '../ducks/products';
import Page from '../layouts/Page';
import Loader from '../components/loader';

class ProductPage extends Component {
    priceStyles = {
        margin: 0
    };

    get body() {
        const { product } = this.props;
        if (!product) return null;

        const {
            name,
            image,
            text,
            price,
            color,
            material,
            company,
        } = product;

        const normalizedPrice = `${parseInt(price)} $`;

        return  (
            <div className="row">
                <div className="col-md-4">
                    <img src={image} alt=""/>
                </div>

                <div className="col-md-7 offset-1">
                    <h1>{name}</h1>

                    <p>{text}</p>

                    <div className="row d-flex align-items-center">
                        <div className="col-auto">
                            <h2 style={this.priceStyles}>{normalizedPrice}</h2>
                        </div>

                        <div className="col-auto">
                            <Button onClick={this.buyBtnClickHandler} variant="contained" size="large" color="primary">Buy item</Button>
                        </div>
                    </div>


                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell>{company}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Color</TableCell>
                                <TableCell>{color}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Material</TableCell>
                                <TableCell>{material}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

    buyBtnClickHandler = () => {
        console.log('buy!');
    };

    componentDidMount() {
        const {
            productId,
            product,
            loading,
            loadProductById
        } = this.props;

        if (productId && !product && !loading) loadProductById(productId);
    }

    render() {
        const { productId, loading } = this.props;

        if (productId === undefined) return <Redirect to="/" />;

        return (
            <Page>
                <div className="container">
                    { loading ? <Loader /> : this.body }
                </div>
            </Page>
        )
    }
}

export default connect((state, ownProps) => ({
    product: productByIdSelector(state, ownProps),
    loading: state.products.loading,
    productId: ownProps.match.params.id
}), { loadProductById })(ProductPage);