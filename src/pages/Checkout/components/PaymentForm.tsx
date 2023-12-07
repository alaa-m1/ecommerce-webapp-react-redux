import { Alert, Box, Button } from "@mui/material";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "shared";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useAppSelector } from "utils/redux/hooks";

export const PaymentForm = () => {
  const { cartTotal } = useAppSelector(selectShoopingCartItemsDetails);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const makePayment = useCallback(async (clientSecret: string) => {
    if (!stripe || !elements) return;
    await stripe
      .confirmPayment({
        clientSecret,
        elements,
        // redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/checkout?payment_status=success`,
          payment_method_data: {
            billing_details: {
              name: currentUser?.displayName ?? "Guest user",
              email: currentUser?.email || "example@mail.com",
            },
          },
        },
      })
      .then((res) => {
        setLoading(false);
        if (res?.error) {
          console.log("Payment Error=", res.error);
        } else {
          console.log("Paymernt is successful");
        }
      });
  },[currentUser?.displayName, currentUser?.email, elements, stripe]);

  const handlePayment = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cartTotal }),
      });
      await res.json().then((r) => makePayment(r.client_secret));
      //     await stripe.confirmCardPayment(clientSecret, {
      //       payment_method: {
      //         card: elements.getElement(CardElement),
      //         billing_details: {
      //           name: "Faruq Yusuff",
      //         },
      //       },
      // });

      // if(paymentRes?.error){
      //   console.log(paymentRes.error)
      // }else
      // if(paymentRes?.paymentIntent?.status==='succeeded'){
      //   console.log('Paymernt successful')

      // }
    },
    [cartTotal, elements, makePayment, stripe]
  );
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", justifyContent: "start" }}
      data-testid="CheckoutDashboard-PaymentForm-div"
    >
      {currentUser ? (
        <>
          {searchParams.get("payment_status") === "success" &&
          searchParams.get("redirect_status") === "succeeded" ? (
            <Alert
              sx={{ mb: 1, width: "60%" }}
              severity="info"
              style={{
                backgroundColor: "#2e7d32",
              }}
            >
              {t("checkout.successfully_payment")}
            </Alert>
          ) : (
            <form className="payment-container" onSubmit={handlePayment}>
              {loading && <LoadingSpinner />}
              <Alert
                sx={{ mb: 1, width: "60%" }}
                severity="info"
                style={{
                  backgroundColor: "#0288d1",
                }}
              >
                {t("checkout.use_test_card_number")}
              </Alert>
              <PaymentElement />
              <Button
                disabled={loading}
                variant="outlined"
                type="submit"
                data-testid="CheckoutDashboard-PaymentForm-btn-payment"
              >
                {t("checkout.process_your_payment")}
              </Button>
            </form>
          )}
        </>
      ) : (
        <Box className="payment-container">
          <Alert
            sx={{ mb: 1, width: "60%" }}
            severity="info"
            style={{
              backgroundColor: "#e65100",
            }}
            data-testid="CheckoutDashboard-PaymentForm-alert-info"
          >
            {t("checkout.login_before_pay")}
          </Alert>
          <Button
            disabled
            variant="outlined"
            type="submit"
            data-testid="CheckoutDashboard-PaymentForm-btn-payment"
          >
            {t("checkout.process_your_payment")}
          </Button>
        </Box>
      )}
      {errorMessage && (
        <Alert
          sx={{ mb: 1, width: "60%" }}
          severity="info"
          style={{
            backgroundColor: "#d32f2f",
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
