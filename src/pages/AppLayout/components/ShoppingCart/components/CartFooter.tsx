import { Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, setShowCart } from "store/shoppingCart/shoppingCartActions";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export const CartFooter = ({ isScrolling }: { isScrolling: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    !isScrolling ? (
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
      </>) : (
      <>
        <Tooltip title="Checkout">
          <IconButton onClick={() => {
            dispatch(setShowCart(false));
            navigate({ pathname: "/checkout" });
          }}>
            <ShoppingCartCheckoutIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove all">
          <IconButton onClick={() => dispatch(emptyCart())}>
            <PlaylistRemoveIcon color="primary" />
          </IconButton>
        </Tooltip>
      </>)
  );
};
