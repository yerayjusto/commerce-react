import React, { useState, useEffect } from 'react'
import {
    Grid, Paper, Stepper, Step, StepLabel,
    Typography, Divider, Button, CircularProgress, CssBaseline
} from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Loading from '../../../utils/Loading'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' }) || {};
                setCheckoutToken(token);
            } catch (error) {
                navigate('/');
            }
        }
        generateToken();
    }, [cart, navigate]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5"> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Main Page</Button>
        </>

    ) : isFinished ? (
        <>
        <div>
            <Typography variant="h5"> Thank you for your purchase</Typography>
            <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Main Page</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Main Page</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : 
    <PaymentForm 
        shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        backStep={backStep} 
        nextStep={nextStep} 
        onCaptureCheckout={onCaptureCheckout} 
        timeout={timeout} 
    />

    if(!checkoutToken) return <Loading />;

    return (
        <>
        <CssBaseline />
            <div className="classes.toolbar" />
            <Grid
            m={2}
            container justifyContent="center" alignItems="center"
            style={{ minHeight: '100vh', width: '100%' }}
            >   
                <Grid item xs={12} sm={12} md={6}>
                <Paper 
                style={{
                    padding: 20,
                }}
                >
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Checkout