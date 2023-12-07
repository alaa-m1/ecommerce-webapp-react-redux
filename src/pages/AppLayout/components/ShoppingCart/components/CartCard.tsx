import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { forwardRef, memo, useEffect, useMemo, useState } from "react";
import { CartCategory } from "types";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { removeFromCart } from "store/shoppingCart/shoppingCartActions";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import withLoadingIndicator from "shared/HOC/withLoadingIndicator";

type CartCardProps = {
  cartItemInfo: CartCategory;
  isUpdated: boolean;
};

export const CartCard = memo(
  forwardRef(function ({ cartItemInfo, isUpdated }: CartCardProps, ref: any) {
    const dispatch = useDispatch();
    const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);

    const [changeColor, setChangeColor] = useState<boolean>(true);
    useEffect(() => {
      setChangeColor(true);
      const timer = setTimeout(() => setChangeColor(false), 1000);
      return () => clearTimeout(timer);
    }, [cartItemInfo.quantity]);

    const handleDeleteItem = () =>
      dispatch(removeFromCart(cartItems, cartItemInfo));

    const imagePath: string = useMemo(
      () =>
        cartItemInfo.imagePath.includes("https")
          ? cartItemInfo.imagePath
          : `${window.location.origin}/images/categories/${cartItemInfo.categoryLabel}/${cartItemInfo.imagePath}`,
      [cartItemInfo.categoryLabel, cartItemInfo.imagePath]
    );

    return (
      <Box
        className="cart-card"
        ref={ref}
        sx={{
          backgroundColor: changeColor && isUpdated ? "#ddd" : "info.light",
        }}
      >
        <Box className="cart-card-img">
          <Tooltip title={cartItemInfo.title}>
            <CardImageWithLoader
              imagePath={imagePath}
              altInfo={cartItemInfo.categoryLabel}
            />
          </Tooltip>
        </Box>
        <Box className="cart-card-info">
          <Box>
            <div className="cart-card-title">
              <Typography color="primary.light">
                {cartItemInfo.title}
              </Typography>
            </div>
            <div className="cart-card-quantity">
              <Typography color="primary.light">{`${cartItemInfo.quantity} x €${cartItemInfo.price}`}</Typography>
            </div>
          </Box>
          <IconButton
            onClick={handleDeleteItem}
            sx={{ width: "35px", height: "35px" }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      </Box>
    );
  })
);

const CardImage = ({
  imagePath,
  altInfo,
  onLoadingIsComplete,
}: {
  imagePath: string;
  altInfo: string;
  onLoadingIsComplete?: () => void;
}) => {
  return (
    <img
      src={imagePath}
      alt={altInfo}
      loading="lazy"
      onLoad={() => onLoadingIsComplete?.()}
    />
  );
};
const CardImageWithLoader = withLoadingIndicator(CardImage, "");
