import { Box, ClickAwayListener, Popper } from "@mui/material";
// import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
// import { useAppSelector } from "utils/redux/hooks";
import React, { useRef } from "react";
import { CartContainer, CartFooter } from "./components";
import _ from "lodash";
import {
  // selectShoopingActiveCart,
  selectShoopingActiveCartIndex,
} from "store/shoppingState/shoppingStateSelector";
import { clsx } from "clsx";
import { useAppSelector } from "utils/redux/hooks";

export const ShoppingCart = ({
  open,
  anchorEl,
  handleClose,
  isScrolling,
}: ShoppingCartProps) => {
  const cartContainerRef = useRef<HTMLDivElement | null>(null);
  // const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);

  //To move shopping cart scroll bar to the bottom of shopping cart panel
  // useEffect(() => {
  //   if (cartContainerRef.current)
  //     cartContainerRef.current.scrollTop =
  //       cartContainerRef.current?.scrollHeight;
  // }, [cartCounter]);

  const activeCartIndex = useAppSelector(selectShoopingActiveCartIndex);
  // const activeCart = useAppSelector(selectShoopingActiveCart);
  // useEffect(() => {
  //   if (activeCart) {
  //     const containerRef = cartContainerRef.current;
  //     if (containerRef !== null)
  //       containerRef.scrollTop = activeCartIndex * 54.8;
  //     containerRef.scrollTo({
  //       top: activeCart.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [activeCart, activeCartIndex]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        id="shopping-cart-popper"
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        className={clsx(
          { "shopping-cart-mini": isScrolling },
          { "shopping-cart": !isScrolling }
        )}
        sx={{
          position: "fixed !important",
          backgroundColor: "info.light",
          borderColor: "primary.main",
        }}
      >
        <Box
          className="cart-container"
          ref={(ref: any) => {
            if (!_.isNull(ref) && activeCartIndex >= 0)
              ref.scrollTop = activeCartIndex * 54.8;

            cartContainerRef.current = ref;
          }}
          sx={{ backgroundColor: "info.light" }}
        >
          <CartContainer />
        </Box>
        <Box className="cart-footer">
          <CartFooter isScrolling={isScrolling} />
        </Box>
      </Popper>
    </ClickAwayListener>
  );
};
type ShoppingCartProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: (event: Event) => void;
  isScrolling: boolean;
};
