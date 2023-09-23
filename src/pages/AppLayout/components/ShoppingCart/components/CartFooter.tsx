import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, setShowCart } from "store/shoppingCart/shoppingCartActions";

export const CartFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", height:"100%", justifyContent: "space-around" , alignItems: "center"}}>
      <Button
        variant="text"
        onClick={() => {
          dispatch(setShowCart(false));
          navigate({ pathname: "/checkout" });
        }}
      >
        Checkout
      </Button>
      <Button variant="text" onClick={() => dispatch(emptyCart())}>
        Remove all
      </Button>
    </Box>
  );
};
