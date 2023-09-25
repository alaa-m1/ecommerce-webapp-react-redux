import { Box, ClickAwayListener, Popper } from "@mui/material";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useAppSelector } from "utils/redux/hooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CartContainer, CartFooter } from "./components";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  selectShoopingActiveCart,
  selectShoopingActiveCartIndex,
} from "store/shoppingState/shoppingStateSelector";

export const ShoppingCart = ({
  open,
  anchorEl,
  handleClose,
}: ShoppingCartProps) => {
  const cartContainerRef = useRef<HTMLDivElement | null>(null);
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);
  //To move shopping cart scroll bar to the bottom of shopping cart panel
  // useEffect(() => {
  //   if (cartContainerRef.current)
  //     cartContainerRef.current.scrollTop =
  //       cartContainerRef.current?.scrollHeight;
  // }, [cartCounter]);

  const activeCart = useSelector(selectShoopingActiveCart);
  const activeCartIndex = useSelector(selectShoopingActiveCartIndex);
  useEffect(() => {
    if (activeCart) {
      const containerRef = cartContainerRef.current;
      if (containerRef !== null)
        containerRef.scrollTo({
          top: activeCart.offsetTop,
          behavior: "smooth",
        });
    }
  }, [activeCart]);

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
            if (!_.isNull(ref) && activeCartIndex >= 0)
              ref.scrollTop = activeCartIndex * 54.8;
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
