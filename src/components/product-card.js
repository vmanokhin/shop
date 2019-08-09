import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import truncate from 'lodash/truncate';

function ProductCard({ product }) {
    const { image, name, text } = product;
    const truncatedText = truncate(text, {
        length: 60,
        omission: '...'
    });

    return (
        <Card>
            <CardActionArea>
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
                <Button size="small" color="primary">
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;