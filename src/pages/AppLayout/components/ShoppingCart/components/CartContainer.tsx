import { Box } from "@mui/material";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { CartCard } from "./CartCard";
import { useShoppingCartScroller } from "../hooks";

export const CartContainer = () => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);

  const { updatedCart, shoppingCartRefs } = useShoppingCartScroller({
    cartItems,
  });

  return (
    <Box>
      {cartItems.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItemInfo={cartItem}
          ref={shoppingCartRefs[cartItem.id]}
          isUpdated={updatedCart?.id === cartItem.id}
        />
      ))}
    </Box>
  );
};
