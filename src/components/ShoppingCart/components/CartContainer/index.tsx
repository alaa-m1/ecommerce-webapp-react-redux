import { Box } from "@mui/material";
import CartCard from "../CartCard";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";

const CartContainer = () => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails)
  return (
    <Box>
      {cartItems.map((cartItem) => (
        <CartCard key={cartItem.id} cartItemInfo={cartItem}/>
      ))}
    </Box>
  );
};
export default CartContainer;
