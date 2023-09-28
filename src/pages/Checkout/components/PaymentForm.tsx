import { Box, Button, TextField } from "@mui/material";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useAppSelector } from "utils/redux/hooks";
import { stripeOptions } from "utils/stripe/stripe";

export const PaymentForm = () => {
    const { cartTotal } = useAppSelector(
        selectShoopingCartItemsDetails
      );
  const { t } = useTranslation();
  const stripe = useStripe();
  const element = useElements();
  const handlePayment = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!stripe || !element) return;
      const res = await fetch("/netlify/functions/create-payment2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cartTotal }),
      }).then((res) => res.json());
      console.log("res=", res);
    },
    [cartTotal, element, stripe]
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "start" }}>
      <form className="payment-container" onSubmit={handlePayment}>
        <PaymentElement />
        <Button variant="outlined" type="submit">
          {t("checkout.process_your_payment")}
        </Button>
      </form>
    </Box>
  );
};
