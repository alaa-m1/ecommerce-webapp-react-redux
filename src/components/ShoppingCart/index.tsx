import { Box, ClickAwayListener, Popper } from "@mui/material";
import CartContainer from "./components/CartContainer";
import CartFooter from "./components/CartFooter";

const ShoppingCart = ({ open, anchorEl, handleClose }: ShoppingCartProps) => {
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        id="shopping-cart-popover"
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{ zIndex: 10000, backgroundColor: "#fff" }}
      >
        <Box className="cart-container">
          <CartContainer />
        </Box>
        <Box className="cart-footer">
          <CartFooter />
        </Box>
      </Popper>
    </ClickAwayListener>
  );
};
export default ShoppingCart;
type ShoppingCartProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: (event: Event) => void;
};
