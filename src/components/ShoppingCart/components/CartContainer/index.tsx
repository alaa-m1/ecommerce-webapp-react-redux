import { Box } from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext } from "utils/context/shoppingCartContext";
import CartCard from "../CartCard";

const CartContainer = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  return (
    <Box>
      {cartItems.map((cartItem) => (
        <CartCard key={cartItem.id} cartItemInfo={cartItem}></CartCard>
      ))}
    </Box>
  );
};
export default CartContainer;
