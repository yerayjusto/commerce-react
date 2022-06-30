import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from "@mui/icons-material";
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} component='img' />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_code}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product