require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK);

const appearance = { /* appearance */ };
const options = { /* options */ };
const elements = stripe.elements({ clientSecret: process.env.STRIPE_SK, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');