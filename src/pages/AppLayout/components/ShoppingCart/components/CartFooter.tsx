import React from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, setShowCart } from "store/shoppingCart/shoppingCartActions";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { useTranslation } from "react-i18next";

export const CartFooter = ({ isScrolling }: { isScrolling: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return !isScrolling ? (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(setShowCart(false));
          navigate({ pathname: "/checkout" });
        }}
        data-testid="ShoppingCart-CartFooter-btn-checkout"
      >
        {t("shopping_cart.checkout")}
      </Button>
      <Button variant="outlined" onClick={() => dispatch(emptyCart())}>
        {t("shopping_cart.remove.all")}
      </Button>
    </>
  ) : (
    <>
      <Tooltip title={t("shopping_cart.checkout")}>
        <IconButton
          onClick={() => {
            dispatch(setShowCart(false));
            navigate({ pathname: "/checkout" });
          }}
        >
          <ShoppingCartCheckoutIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("shopping_cart.remove.all")}>
        <IconButton onClick={() => dispatch(emptyCart())}>
          <PlaylistRemoveIcon color="primary" />
        </IconButton>
      </Tooltip>
    </>
  );
};
