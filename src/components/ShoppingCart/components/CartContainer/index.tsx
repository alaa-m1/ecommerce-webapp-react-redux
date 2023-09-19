import { Box } from "@mui/material";
import CartCard from "../CartCard";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import useShoppingCartScroller from "components/ShoppingCart/hooks/useShoppingCartScroller";

const CartContainer = () => {
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
export default CartContainer;
