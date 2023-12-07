import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { CartCard } from "./CartCard";
import { useShoppingCartScroller } from "../hooks";
import { selectShoopingActiveCartId } from "store/shoppingState/shoppingStateSelector";

export const CartContainer = () => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const activateCartId = useAppSelector(selectShoopingActiveCartId);
  const { shoppingCartRefs } = useShoppingCartScroller({
    cartItems,
  });

  return (
    <Box sx={{ borderColor: "primary.light" }}>
      {cartItems.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItemInfo={cartItem}
          ref={shoppingCartRefs[cartItem.id]}
          isUpdated={activateCartId === cartItem.id}
        />
      ))}
    </Box>
  );
};
