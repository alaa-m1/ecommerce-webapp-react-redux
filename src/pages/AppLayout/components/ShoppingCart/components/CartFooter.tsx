import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, setShowCart } from "store/shoppingCart/shoppingCartActions";

export const CartFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(setShowCart(false));
          navigate({ pathname: "/checkout" });
        }}
      >
        Checkout
      </Button>
      <Button variant="outlined" onClick={() => dispatch(emptyCart())}>
        Remove all
      </Button>
    </>
  );
};
