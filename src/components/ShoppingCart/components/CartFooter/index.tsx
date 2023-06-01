import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "utils/context/shoppingCartContext";

const CartFooter = () => {
  const { setShowCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          setShowCart(false);
          navigate({ pathname: "/checkout" });
        }}
      >
        Checkout
      </Button>
    </Box>
  );
};
export default CartFooter;
