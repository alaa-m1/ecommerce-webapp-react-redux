import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowCart } from "store/shoppingCart/shoppingCartActions";

const CartFooter = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setShowCart(false));
          navigate({ pathname: "/checkout" });
        }}
      >
        Checkout
      </Button>
    </Box>
  );
};
export default CartFooter;
