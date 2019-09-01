import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import truncate from 'lodash/truncate';

import AdapterLink from '../common/adapter-link';
import { addToCart } from '../../ducks/cart';


function ProductCard(props) {
    const { product, addToCart } = props;
    const { image, name, text, id } = product;
    const truncatedText = truncate(text, {
        length: 60,
        omission: '...'
    });

    return (
        <Card>
            <CardActionArea component={AdapterLink} to={`/product/${id}/`}>
                <CardMedia
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {truncatedText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={addToCart}>
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
}

export default connect(null, (dispatch, ownProps) => ({
    addToCart: () => dispatch(addToCart(ownProps.product.id))
}))(ProductCard);