require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentProcess = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_type: ["card"],
    });
    return { statusCode: 200, body: JSON.stringify({ paymentProcess }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, body: JSON.stringify({ error }) };
  }
};
