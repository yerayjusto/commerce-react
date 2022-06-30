import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">No items in Cart,
        <Link to="/" className={classes.link}>start adding some item</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal: { cart.subtotal.formatted_with_symbol }</Typography>
            <div>
                <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant="contained" color="secondary">
                    Empty Cart
                </Button>
                <Button component={Link} to="/checkout" className={classes.checkOut} size="large" type="button" variant="contained" color="primary">
                    Checkout
                </Button>
            </div>
        </div>
        </>
    )

    if(!cart.line_items) return 'Loading...';

  return (
      <Container>
          <div className={classes.toolbar} />
          <Typography className={classes.title} variant="h3" gutterBottom>
              Your Shopping Cart
          </Typography>
          { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
      </Container>
  )
}

export default Cart