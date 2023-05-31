import { Box } from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext } from "utils/context/shoppingCartContext";
import CartCard from "../CartCard";
import { CartCategory } from "types";

const CartContainer = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  return (
    <Box>
      {(cartItems as Array<CartCategory>).map((cartItem) => (
        <CartCard key={cartItem.id} cartItemInfo={cartItem}></CartCard>
      ))}
    </Box>
  );
};
export default CartContainer;
