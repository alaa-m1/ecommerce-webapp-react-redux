import { Box, Button, Typography } from "@mui/material";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import withLoadingIndicator from "shared/HOC/withLoadingIndicator";
import { addToCart, setShowCart } from "store/shoppingCart/shoppingCartActions";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import {
  setActiveCartId,
  setActiveCartIndex,
} from "store/shoppingState/shoppingStateActions";
import { Product } from "types";
import { useAppSelector } from "utils/redux/hooks";

type ShopCategoryCardProps = {
  cardInfo: Product;
};

export const ShopCategoryCard = memo(({ cardInfo }: ShopCategoryCardProps) => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(cartItems, cardInfo));
    dispatch(setShowCart(true));
    const activeCartIndex = cartItems.findIndex(
      (item) => item.id === cardInfo.id
    );
    dispatch(
      setActiveCartIndex(
        activeCartIndex !== -1 ? activeCartIndex : cartItems.length
      )
    );
    dispatch(setActiveCartId(cardInfo.id));
  }, [dispatch, cartItems, cardInfo]);

  const imagePath: string = useMemo(
    () =>
      cardInfo.imagePath.includes("https")
        ? cardInfo.imagePath
        : `${window.location.origin}/images/categories/${cardInfo.categoryLabel}/${cardInfo.imagePath}`,
    [cardInfo.categoryLabel, cardInfo.imagePath]
  );
  return (
    <Box
      className="shop-category-card"
      sx={{ color: "secondary.dark" }}
      data-testid="ShopCategoryCard-div"
    >
      <Box className="shop-category-images">
        <CardImageWithLoader
          imagePath={imagePath}
          altInfo={cardInfo.categoryLabel}
        />
      </Box>
      <Box className="shopping-title">
        <Typography color="primary.light">{cardInfo.title}</Typography>
      </Box>
      <Box className="shop-category-info">
        <Typography fontSize="18px" color="primary.light">
          {`€${cardInfo.price}`}
        </Typography>
        <Button
          id="shopping-add-btn"
          variant="contained"
          onClick={handleAddToCart}
          data-testid="ShopCategoryCard-btn-addToCart"
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
});

ShopCategoryCard.displayName = "ShopCategoryCard";

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
const CardImageWithLoader = withLoadingIndicator(CardImage, "loading");
