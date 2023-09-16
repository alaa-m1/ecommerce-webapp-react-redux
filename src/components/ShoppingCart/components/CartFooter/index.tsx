import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, setShowCart } from "store/shoppingCart/shoppingCartActions";

const CartFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", height:"100%", justifyContent: "space-around" , alignItems: "center"}}>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setShowCart(false));
          navigate({ pathname: "/checkout" });
        }}
      >
        Checkout
      </Button>
      <Button variant="contained" onClick={() => dispatch(emptyCart())}>
        Remove all
      </Button>
    </Box>
  );
};
export default CartFooter;
