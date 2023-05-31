import { Box } from "@mui/material";
import CartContainer from "./components/CartContainer";
import CartFooter from "./components/CartFooter";

const ShoppingCart = () => {

  return (
    <Box className="shopping-cart">
      <Box className="cart-container">
        <CartContainer/>
      </Box>
      <Box className="cart-footer">
        <CartFooter/>
      </Box>
    </Box>
  );
};
export default ShoppingCart;
