import { Box, ClickAwayListener, Popper } from "@mui/material";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useAppSelector } from "utils/redux/hooks";
import { useEffect, useRef } from "react";
import _ from "lodash";
import { CartContainer, CartFooter } from "./components";

export const ShoppingCart = ({ open, anchorEl, handleClose }: ShoppingCartProps) => {
  const cartContainerRef = useRef<HTMLDivElement | null>(null);
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);

  useEffect(() => {
    //To move shopping cart scroll bar to the bottom of shopping cart panel
    // if (cartContainerRef.current)
    //   cartContainerRef.current.scrollTop =
    //     cartContainerRef.current?.scrollHeight;
  }, [cartCounter]);


  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        id="shopping-cart-popover"
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        className="shopping-cart"
      >
        <Box
          className="cart-container"
          ref={(ref: any) => {
            // if (!_.isNull(ref)) ref.scrollTop = ref.scrollHeight;
            cartContainerRef.current = ref;
          }}
        >
          <CartContainer />
        </Box>
        <Box className="cart-footer">
          <CartFooter />
        </Box>
      </Popper>
    </ClickAwayListener>
  );
};
type ShoppingCartProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: (event: Event) => void;
};
